const { Op, fn, col, literal } = require("sequelize");
const {
  Products,
  Imagesproduct,
  Categories,
  Orders,
  Ordersdetail,
  Pro_translation,
} = require("../models");
const { translateJSON } = require("../services/translate.js");

const createProducts = async (req, res) => {
  const {
    categoriesid,
    price,
    brand,
    quantity,
    languagecode,
    name,
    description,
  } = req.body;
  const t = await sequelize.transaction();
  try {
    const product = await Products.create(
      { categoriesid, price, brand, quantity },
      { transaction: t }
    );

    if (languagecode && name) {
      await Pro_translation.create(
        {
          productid: product.id,
          languagecode,
          name,
          description: description || null,
        },
        { transaction: t }
      );
    }

    await t.commit();
    const created = await Products.findOne({
      where: { id: product.id },
      include: [
        { model: Categories, attributes: ["name"] },
        {
          model: Pro_translation,
          attributes: ["languagecode", "name", "description"],
        },
      ],
    });
    res.status(201).send(created);
  } catch (error) {
    await t.rollback();
    res.status(500).send(error);
  }
};

const getAllProducts = async (req, res) => {
  const { name, languagecode } = req.query;
  console.log(name);
  try {
    const where = {};
    const include = [
      {
        model: Categories,
        attributes: ["name"],
      },
      {
        model: Imagesproduct,
        attributes: ["url"],
      },
    ];

    // Nếu có languagecode thì tìm theo bản dịch; nếu có name kèm languagecode thì tìm trong Pro_translation
    if (languagecode) {
      const transWhere = { languagecode };
      if (name) {
        transWhere.name = { [Op.like]: `%${name}%` };
      }

      include.push({
        model: Pro_translation,
        attributes: ["name", "languagecode", "description"],
        where: transWhere,
        required: true, // chỉ lấy sản phẩm có bản dịch đúng languagecode
      });
    } else if (name) {
      // Nếu không có languagecode nhưng có name -> tìm trên trường name của Products
      where.name = { [Op.like]: `%${name}%` };
    }

    const productslist = await Products.findAll({
      where,
      include,
    });

    res.status(200).send(productslist);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailProducts = async (req, res) => {
  const { id } = req.params;
  const { languagecode } = req.query;
  try {
    const include = [
      {
        model: Categories,
        attributes: ["name"],
      },
      {
        model: Imagesproduct,
        attributes: ["id", "url"],
      },
    ];

    //Nếu tồn tại language code thì lấy bản dịch
    if (languagecode) {
      include.push({
        model: Pro_translation,
        attributes: ["name", "languagecode", "description"],
        where: { languagecode },
        required: false, // Left join (nghĩa là vẫn lấy product nếu không có bản dịch)
      });
    }

    const detailProducts = await Products.findOne({
      where: { id },
      include,
    });
    if (!detailProducts) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(detailProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const {
    categoriesid,
    price,
    brand,
    quantity,
    languagecode,
    name,
    description,
  } = req.body;
  const t = await sequelize.transaction();
  try {
    const product = await Products.findOne({ where: { id } });
    if (!product) {
      await t.rollback();
      return res.status(404).send({ message: "Product not found" });
    }

    if (categoriesid !== undefined) product.categoriesid = categoriesid;
    if (price !== undefined) product.price = price;
    if (brand !== undefined) product.brand = brand;
    if (quantity !== undefined) product.quantity = quantity;
    await product.save({ transaction: t });

    if (languagecode && (name !== undefined || description !== undefined)) {
      const trans = await Pro_translation.findOne({
        where: { productid: id, languagecode },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (trans) {
        if (name !== undefined) trans.name = name;
        if (description !== undefined) trans.description = description;
        await trans.save({ transaction: t });
      } else {
        await Pro_translation.create(
          {
            productid: id,
            languagecode,
            name: name || "",
            description: description || null,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();

    const updated = await Products.findOne({
      where: { id },
      include: [
        { model: Categories, attributes: ["name"] },
        {
          model: Pro_translation,
          attributes: ["languagecode", "name", "description"],
          where: languagecode ? { languagecode } : undefined,
          required: false,
        },
      ],
    });

    res.status(200).send(updated);
  } catch (error) {
    await t.rollback();
    res.status(500).send(error);
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    await Products.destroy({
      where: { id },
    });
    await Imagesproduct.destroy({
      where: { productid: id },
    });
    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTop5ProductsByMonth = async (req, res) => {
  const { month, year } = req.query;
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const topProducts = await Ordersdetail.findAll({
      attributes: [
        "productid",
        [fn("SUM", col("Ordersdetail.quantity")), "totalSold"],
      ],
      include: [
        {
          model: Orders,
          attributes: [],
          where: {
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
            status: 1, // chỉ tính đơn đã hoàn thành (nếu có trường status)
          },
        },
        {
          model: Products,
          attributes: ["id", "name", "price"],
        },
      ],
      group: ["productid", "Product.id"],
      order: [[literal("totalSold"), "DESC"]],
      limit: 5,
    });

    res.status(200).send(topProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createtranslatedProduct = async (req, res) => {
  try {
    const { productid, lang, targetlang } = req.body;

    // Lấy bản ghi gốc
    const translated = await Pro_translation.findOne({
      where: { productid, languagecode: lang },
      raw: true,
      attributes: ["name", "description"],
    });

    if (!translated) {
      return res.status(404).send({ message: "Không tìm thấy sản phẩm." });
    }

    console.log("Original JSON:", translated);

    // Dịch từng trường
    const result = await translateJSON(translated, lang, targetlang);

    const finalresult = await Pro_translation.create({
      productid,
      languagecode: targetlang,
      name: result.name,
      description: result.description,
    });

    return res.status(201).send(finalresult);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Lỗi server", details: err });
  }
};

module.exports = {
  createProducts,
  getAllProducts,
  getDetailProducts,
  updateProducts,
  deleteProducts,
  getTop5ProductsByMonth,
  createtranslatedProduct,
};
