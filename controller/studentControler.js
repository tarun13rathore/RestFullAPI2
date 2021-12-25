const Student = require("../models/studentModel");
const path = require("path");
const fs = require("fs");
const studentValidator = require("../validator/studentValidator");

//add student
exports.addStudent = async (req, res, next) => {
  let filePath;
  if (req.file) {
    filePath = req.file.path;
  }

  // validation
  const { error } = studentValidator.validate(req.body);
  if (error) {
    // Delete the uploaded file
    fs.unlink(`${appRoot}/${filePath}`, (err) => {
      if (err) {
        return next(err, { message: "Internal server Error" });
      }
    });

    return next(error);
    // rootfolder/uploads/filename.png
  }

  const { name, email, phone, address } = req.body;
  let student;
  try {
    student = await Student.create({
      name,
      email,
      phone,
      address,
      avatar: filePath,
    });
  } catch (err) {
    return next(err);
  }
  console.log("text", student);
  res.status(201).json(student);
};

// exports.addStudent = async (req, res) => {
//   try {
//     console.log(req.file);
//     console.log(req.body);
//     const user = new Student(req.body);
//     Student(req.file.path);
//     const createUser = await user.save();
//     res.status(201).send(createUser);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// };

// get student
exports.getStudent = async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(201).send(studentsData);
  } catch (e) {
    res.status(400).send(e);
  }
};

//get by id student
exports.getByIdStudent = async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    if (!studentData) {
      return res.status(404).send();
    } else {
      res.status(201).send(studentData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

//update data by id
exports.updateByIdStudent = async (req, res, next) => {
  let filePath;
  if (req.file) {
    filePath = req.file.path;
  }

  // validation
  const { error } = studentValidator.validate(req.body);
  if (error) {
    // Delete the uploaded file
    if (req.file) {
      fs.unlink(`${appRoot}/${filePath}`, (err) => {
        if (err) {
          return next(err, { message: "invalid" });
        }
      });
    }

    return next(error);
    // rootfolder/uploads/filename.png
  }

  const { name, email, phone, address } = req.body;
  let student;

  try {
    student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        email,
        phone,
        address,
        ...(req.file && { avatar: filePath }),
      },
      { new: true }
    );
  } catch (err) {
    return next(err);
  }
  console.log("text", student);
  res.status(201).json(student);
};

// exports.updateByIdStudent = async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
//       new: true,
//     });
//     res.status(201).send(updateStudent);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// };

//Delete data by id using
exports.deleteByIDStudent = async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    } else {
      res.status(410).send(deleteStudent);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
