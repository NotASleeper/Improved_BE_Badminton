const { Op, fn, col, literal } = require("sequelize");
const {
  Products,
  Imagesproduct,
  Categories,
  Orders,
  Ordersdetail,
  Pro_translation,
  sequelize,
} = require("../models");
const { isProductinFlashsale } = require("./flashsales.controllers");

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

  try {
    const product = await Products.create({
      categoriesid,
      price,
      brand,
      quantity,
    });

    if (languagecode && name) {
      await Pro_translation.create({
        productid: product.id,
        languagecode,
        name,
        description: description || null,
      });
    }

    const created = await Products.findOne({
      where: { id: product.id },
      include: [
        { model: Categories, as: "cate", attributes: ["name"] },
        {
          model: Pro_translation,
          as: "translations",
          attributes: ["languagecode", "name", "description"],
        },
      ],
    });
    res.status(201).send(created);
  } catch (error) {
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
        as: "cate",
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
        as: "translations",
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

    const enriched = await Promise.all(
      productslist.map(async (product) => {
        const json = product.toJSON();
        const fsd = await isProductinFlashsale(product.id);
        if (fsd) {
          const basePrice = product.price;
          const salePrice =
            fsd.type === 0
              ? Math.max(0, basePrice - (basePrice * fsd.value) / 100)
              : Math.max(0, basePrice - fsd.value);
          json.flashsale = {
            id: fsd.id,
            flashsaleid: fsd.flashsaleid,
            type: fsd.type,
            value: fsd.value,
            sale_price: salePrice,
          };
        } else {
          json.flashsale = null;
        }
        return json;
      })
    );

    res.status(200).send(enriched);
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
        as: "cate",
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
        as: "translations",
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
    const fsd = await isProductinFlashsale(detailProducts.id);
    const json = detailProducts.toJSON();
    if (fsd) {
      const basePrice = detailProducts.price;
      const salePrice =
        fsd.type === 0
          ? Math.max(0, basePrice - (basePrice * fsd.value) / 100)
          : Math.max(0, basePrice - fsd.value);
      json.flashsale = {
        id: fsd.id,
        flashsaleid: fsd.flashsaleid,
        type: fsd.type,
        value: fsd.value,
        sale_price: salePrice,
      };
    } else {
      json.flashsale = null;
    }
    res.status(200).send(json);
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

  try {
    const product = await Products.findOne({ where: { id } });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (categoriesid !== undefined) product.categoriesid = categoriesid;
    if (price !== undefined) product.price = price;
    if (brand !== undefined) product.brand = brand;
    if (quantity !== undefined) product.quantity = quantity;
    await product.save();

    if (languagecode && (name !== undefined || description !== undefined)) {
      const trans = await Pro_translation.findOne({
        where: { productid: id, languagecode },
      });

      if (trans) {
        if (name !== undefined) trans.name = name;
        if (description !== undefined) trans.description = description;
        await trans.save();
      } else {
        await Pro_translation.create({
          productid: id,
          languagecode,
          name: name || "",
          description: description || null,
        });
      }
    }

    const updated = await Products.findOne({
      where: { id },
      include: [
        { model: Categories, as: "cate", attributes: ["name"] },
        {
          model: Pro_translation,
          as: "translations",
          attributes: ["languagecode", "name", "description"],
          where: languagecode ? { languagecode } : undefined,
          required: false,
        },
      ],
    });

    res.status(200).send(updated);
  } catch (error) {
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
  const { month, year, lang } = req.query;
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Step 1: Get top 5 products by sales
    const topProductIds = await Ordersdetail.findAll({
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
            status: 1,
          },
        },
      ],
      group: ["productid"],
      order: [[literal("totalSold"), "DESC"]],
      limit: 5,
      raw: true,
      subQuery: false,
    });

    // Step 2: Extract product IDs and get full product details with translations
    const productIds = topProductIds.map((item) => item.productid);

    const topProducts = await Products.findAll({
      where: { id: { [Op.in]: productIds } },
      attributes: ["id", "price", "brand", "quantity"],
      include: [
        {
          model: Pro_translation,
          as: "translations",
          attributes: ["languagecode", "name", "description"],
          where: lang ? { languagecode: lang } : undefined,
          required: false,
        },
      ],
    });

    // Step 3: Merge totalSold back into products
    const result = topProducts.map((product) => {
      const sales = topProductIds.find((item) => item.productid === product.id);
      return {
        ...product.toJSON(),
        totalSold: sales ? sales.totalSold : 0,
      };
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createProducts,
  getAllProducts,
  getDetailProducts,
  updateProducts,
  deleteProducts,
  getTop5ProductsByMonth,
};
