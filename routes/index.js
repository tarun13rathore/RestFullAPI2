const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addStudent,
  getStudent,
  getByIdStudent,
  updateByIdStudent,
  deleteByIDStudent,
} = require("../controller/studentControler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/student", upload.single("avatar"), addStudent);
router.get("/student", getStudent);
router.get("/student/:id", getByIdStudent);
router.put("/student/:id", upload.single("avatar"), updateByIdStudent);
router.delete("/student/:id", deleteByIDStudent);

router.get("/", function (req, res) {
  res.status(200).send("woking API");
});

//router.route("/student/add").post(addStudent);

module.exports = router;
