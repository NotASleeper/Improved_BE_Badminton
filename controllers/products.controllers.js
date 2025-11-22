const { Op, fn, col, literal } = require("sequelize");
const {
  Products,
  Imagesproduct,
  Categories,
  Orders,
  Ordersdetail,
  Pro_translation,
} = require("../models");

const createProducts = async (req, res) => {
  try {
    const { name, categoriesid, description, price, brand, quantity } =
      req.body;
    const newProducts = await Products.create({
      name,
      categoriesid,
      description,
      price,
      brand,
      quantity,
    });
    res.status(201).send(newProducts);
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
  try {
    const detailProducts = await Products.findOne({
      where: { id },
      include: [
        {
          model: Categories,
          attributes: ["name"],
        },
        {
          model: Imagesproduct,
          attributes: ["id", "url"],
        },
      ],
    });
    res.status(200).send(detailProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, categoriesid, description, price, brand, quantity } = req.body;
  try {
    const detailProducts = await Products.findOne({
      where: { id },
    });
    detailProducts.name = name;
    detailProducts.categoriesid = categoriesid;
    detailProducts.description = description;
    detailProducts.price = price;
    detailProducts.brand = brand;
    detailProducts.quantity = quantity;
    await detailProducts.save();
    res.status(200).send(detailProducts);
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

module.exports = {
  createProducts,
  getAllProducts,
  getDetailProducts,
  updateProducts,
  deleteProducts,
  getTop5ProductsByMonth,
};
