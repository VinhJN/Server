const express = require("express");
const router = express.Router();
const Upload = require("../config/common/upload");
const Students = require("../models/students");

// Get list of students
router.get("/get-list-student", async (req, res) => {
  try {
    const data = await Students.find().sort({creatAt: -1});
    res.json({
      status: 200,
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: [],
    });
  }
});

// Add a new student
router.post("/add-student-with-file-image", Upload.array("avatar", 5), async (req, res) => {
  try {
    const data = req.body;
    const { files } = req; //files nếu upload nhiều, file nếu upload 1 file
    const urlsImage = files.map(
      (file) =>
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const newStudent = new Students({
      name: data.name,
      mssv: data.mssv,
      point: data.point,
      avatar: urlsImage,
    });

    const result = await newStudent.save();
    res.json({
      status: 200,
      message: "Successfully added",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: [],
    });
  }
});

// Update student by ID
router.put("/update-student-by-id/:id", Upload.array("avatar", 5), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { files } = req;

      let url1;
      const updatestudent = await Students.findById(id);
      if (files && files.length > 0) {
        url1 = files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      }
      if (url1 == null) {
        url1 = updatestudent.image;
      }

      let result = null;
      if (updatestudent) {
        (updatestudent.name = data.name ?? updatestudent.name),
          (updatestudent.mssv = data.mssv ?? updatestudent.mssv),
          (updatestudent.point = data.point ?? updatestudent.point),
          (updatestudent.image = url1),
          (result = (await updatestudent.save()));
      }

    if (result) {
        res.json({
          status: 200,
          messenger: "Cập nhật thành công",
          data: result,
        });
      } else {
        res.json({
          status: 400,
          messenger: "Cập nhật không thành công",
          data: [],
        });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: [],
    });
  }
});

// Delete student by ID
router.delete("/delete-student-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Students.findByIdAndDelete(id);
    res.json({
      status: 200,
      message: "Successfully deleted",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: [],
    });
  }
});

// Search students
router.get("/search-student", async (req, res) => {
  try {
    const key = req.query.key;

    const data = await Students.find({
      name: { $regex: key, $options: "i" },
    }).sort({ createdAt: -1 });

    if (data) {
      res.json({
        status: 200,
        messenger: "Thành công",
        data: data,
      });
    } else {
      res.json({
        status: 400,
        messenger: "Lỗi, không thành công",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Sort students by name
router.get("/sort-student-by-name", async (req, res) => {
  try {
    const data = await Students.find().sort({ name: 1 });
    res.json({
      status: 200,
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: [],
    });
  }
});

module.exports = router;
