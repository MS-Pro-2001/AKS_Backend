import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import familyDetailsModel from "../models/familyDetails.model.js";
import multer from "multer";
import path from "path";

export const fetchAllUsers = async (req, res) => {
  try {
    const user = await userModel
      .find()
      .sort({ firstName: 1 })
      .select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ msg: "Oops!! could not fetch users" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const fetchSingleUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await userModel
      .findById({ _id: user_id })
      .populate("familyDetails")
      .select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ msg: "Oops!! could not fetch user", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      phone_no,
      ward,
      address,
      user_id,
      familyPhoto,
    } = req.body;
    const user = await userModel
      .findOneAndUpdate(
        { _id: user_id },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          dob: dob,
          phone_no: phone_no,
          ward: ward,
          address: address,
          familyPhoto: familyPhoto,
        },
        { new: true }
      )
      .select("-password");

    if (user) {
      res.status(200).json({
        msg: "Your details have been updated successfully",
        success: true,
        type: "success",
        user: user,
      });
    } else {
      res.status(400).json({
        msg: "Could not update your details. Please try again later",
        success: false,
        type: "error",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      msg: error.message,
      success: false,
      type: "warning",
    });
  }
};

export const fetchFamilyDetails = async (req, res) => {
  const user_id = req.params._id;
  try {
    // const { user_id } = req.body;
    // console.log(user_id)
    const user = await userModel.findById({ _id: user_id });
    const familyDetails = await familyDetailsModel.find({
      _id: { $in: user.familyDetails },
    });
    console.log({ user: user.familyDetails });

    // The $in operator selects the documents where the value of a field equals any value in the specified array.

    res.status(200).json(familyDetails);
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error: error });
  }
};

export const addFamilyDetails = async (req, res) => {
  console.log({ a: req.body });
  try {
    const { name_of_member, relationship_with_user, dob, user_id } = req.body;

    if (!name_of_member || !relationship_with_user || !dob) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all the fields",
        type: "warning",
      });
    }

    const user = await userModel.findById(user_id);
    console.log({ user });

    if (!user) {
      return res.status(403).json({
        success: false,
        msg: "Could not find user",
        type: "warning",
      });
    }

    const familyDetail = new familyDetailsModel({
      user: user_id,
      name_of_member,
      relationship_with_user,
      dob,
    });
    console.log({ familyDetail });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await familyDetail.save({ session });

      await userModel.updateOne(
        { _id: user_id },
        { $push: { familyDetails: familyDetail._id } },
        { session }
      );

      await session.commitTransaction();

      return res.status(200).json({
        success: true,
        msg: "Family details added successfully",
        family_detail: familyDetail,
      });
    } catch (error) {
      await session.abortTransaction();
      throw error; // Ensure the error is caught by the outer catch block
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Could not add family detail. Please try again later",
      error: error.message, // Provide the error message
    });
  }
};

export const updateFamilyDetails = async (req, res) => {};

export const uploadPhoto = (req, res) => {
  console.log({ body: req.body });
  console.log({ file: req.file });

  res.send("Uplaoded");

  // try {
  //   const storage = multer.diskStorage({
  //     destination: "./uploads/",
  //     filename: function (_, file, cb) {
  //       cb(null, Date.now() + path.extname(file.originalname));
  //     },
  //   });

  //   function checkFileType(file, cb) {
  //     const filetypes = /jpeg|jpg|png/;
  //     const extname = filetypes.test(
  //       path.extname(file.originalname).toLowerCase()
  //     );
  //     const mimetype = filetypes.test(file.mimetype);

  //     if (mimetype && extname) {
  //       return cb(null, true);
  //     } else {
  //       cb("Error: Images only! (jpeg,jpg,png)");
  //     }
  //   }

  //   const upload = multer({
  //     storage: storage,
  //     limits: { fileSize: 1000000 }, // 1MB,
  //     fileFilter: function (req, file, cb) {
  //       checkFileType(file, cb);
  //     },
  //   }).single("familyPhoto");

  //   upload(req, res, (err) => {
  //     if (err) {
  //       console.log({ err });
  //       return res.status(500).json({ error: err });
  //     }
  //     if (!req.file) {
  //       return res.status(400).json({ error: "Please attach a file" });
  //     }

  //     console.log({ file: req.file });
  //     res.send("Family Photo uploaded");
  //   });
  // } catch (error) {
  //   console.log("catch error", { error });
  // }
};
