const Student = require("../models/studentModel.js");
const { v4: uuidv4 } = require("uuid");

exports.index = async (req, res) => {
  const students = await Student.getAll();
  res.render("index", { students });
};

exports.create = async (req, res) => {
  const student = {
    id: uuidv4(),
    name: req.body.name,
    age: req.body.age,
  };

  await Student.create(student);
  res.redirect("/");
};

exports.delete = async (req, res) => {
  await Student.delete(req.params.id);
  res.redirect("/");
};
