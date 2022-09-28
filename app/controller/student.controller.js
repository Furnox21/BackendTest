const db = require("../models");
const Student = db.student;

exports.create = (req, res) => {
  const student = new Student({
    name: req.body.name,
    status: req.body.status,
    major: req.body.major,
    passion: req.body.passion,
  });

  // Save Student in the database
  student
    .save(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Student.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving with id=" + id });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found!`,
        });
      } else res.send({ message: "Student was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Student with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      } else {
        res.send({
          message: "Student was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {};

exports.findAllPublished = (req, res) => {};
