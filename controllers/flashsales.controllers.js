const { Flashsales } = require("../models");

const createFlashsale = async (req, res) => {
  try {
    const { name, description, start, end } = req.body;
    const newFlashsale = await Flashsales.create({
      name,
      description,
      start,
      end,
    });
    res.status(201).send(newFlashsale);
  } catch (error) {
    res.status(500).send({ error: "Failed to create flash sale" });
  }
};

const getAllFlashsales = async (req, res) => {
  try {
    const flashsales = await Flashsales.findAll();
    res.status(200).send(flashsales);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve flash sales" });
  }
};

const getFlashsaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const flashsale = await Flashsales.findByPk(id);
    if (flashsale) {
      res.status(200).send(flashsale);
    } else {
      res.status(404).send({ error: "Flash sale not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve flash sale" });
  }
};

const updateFlashsale = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, start, end } = req.body;
    const flashsale = await Flashsales.findByPk(id);
    if (flashsale) {
      flashsale.name = name;
      flashsale.description = description;
      flashsale.start = start;
      flashsale.end = end;
      await flashsale.save();
      res.status(200).send(flashsale);
    } else {
      res.status(404).send({ error: "Flash sale not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update flash sale" });
  }
};

const deleteFlashsale = async (req, res) => {
  try {
    const { id } = req.params;
    const flashsale = await Flashsales.findByPk(id);
    if (flashsale) {
      await flashsale.destroy();
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Flash sale not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete flash sale" });
  }
};

module.exports = {
  createFlashsale,
  getAllFlashsales,
  getFlashsaleById,
  updateFlashsale,
  deleteFlashsale,
};
