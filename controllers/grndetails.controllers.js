const { GRNdetails, Products, GRN, Pro_translation } = require("../models");

const createGRNDetails = async (req, res) => {
  try {
    const { grnid, productid, price, quantity } = req.body;
    const newGRNDetails = await GRNdetails.create({
      grnid,
      productid,
      price,
      quantity,
    });

    // Cập nhật quantity cho Product
    const product = await Products.findOne({ where: { id: productid } });
    if (product) {
      product.quantity += quantity;
      await product.save();
    }

    // Cập nhật totalprice cho GRN
    const grn = await GRN.findByPk(grnid);
    if (grn) {
      grn.totalprice += price * quantity;
      await grn.save();
    }
    res.status(201).json(newGRNDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getlistGRNDetails = async (req, res) => {
  const { grnid } = req.params;
  const { lang } = req.query;
  try {
    const grnDetails = await GRNdetails.findAll({
      where: { grnid: grnid },
      include: [
        {
          model: Products,
          attributes: ["id", "price", "brand"],
          include: [
            {
              model: Pro_translation,
              as: "translations",
              attributes: ["languagecode", "name", "description"],
              where: { languagecode: lang },
            },
          ],
        },
      ],
    });
    res.status(200).send(grnDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getGRNDetailsById = async (req, res) => {
  const { id, grnid } = req.params;
  const { lang } = req.query;
  try {
    const detailGRNDetails = await GRNdetails.findOne({
      where: {
        id: id,
        grnid: grnid,
      },
      include: [
        {
          model: Products,
          attributes: ["id", "price", "brand"],
          include: [
            {
              model: Pro_translation,
              as: "translations",
              attributes: ["languagecode", "name", "description"],
              where: { languagecode: lang },
            },
          ],
        },
      ],
    });
    res.status(200).send(detailGRNDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateGRNDetails = async (req, res) => {
  const { id, grnid } = req.params;
  const { productid, price, quantity } = req.body;
  try {
    const detailGRNDetails = await GRNdetails.findOne({
      where: {
        id: id,
        grnid: grnid,
      },
    });
    detailGRNDetails.productid = productid;
    detailGRNDetails.price = price;
    detailGRNDetails.quantity = quantity;
    await detailGRNDetails.save();
    res.status(200).send(detailGRNDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteGRNDetails = async (req, res) => {
  const { id, grnid } = req.params;
  try {
    // Lấy chi tiết GRNDetails trước khi xóa
    const detailGRNDetails = await GRNdetails.findOne({
      where: {
        id: id,
        grnid: grnid,
      },
    });

    if (!detailGRNDetails) {
      return res.status(404).send("Not found");
    }

    // Cập nhật quantity cho Product
    const product = await Products.findByPk(detailGRNDetails.productid);
    if (product) {
      product.quantity -= detailGRNDetails.quantity;
      await product.save();
    }

    // Cập nhật totalprice cho GRN
    const grn = await GRN.findByPk(grnid);
    if (grn) {
      grn.totalprice -= detailGRNDetails.price * detailGRNDetails.quantity;
      await grn.save();
    }

    await detailGRNDetails.destroy();

    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createGRNDetails,
  getlistGRNDetails,
  getGRNDetailsById,
  updateGRNDetails,
  deleteGRNDetails,
};
