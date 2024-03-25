import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import familyDetailsModel from "../models/familyDetails.model.js";

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
  try {
    const user = await userModel
      .findById({ _id: req.body.user_id })
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
  try {
    const { user_id } = req.body;
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
  try {
    const { name_of_member, relationship_with_user, dob, user_id } = req.body;
    const user = await userModel.findById({ _id: user_id });

    if (!name_of_member || !relationship_with_user || !dob) {
      return res.status(400).json({
        sucess: false,
        msg: "please fill all the fields",
        type: "warning",
      });
    }
    if (!user) {
      return res
        .status(403)
        .json({ success: false, msg: "could not find user", type: "warning" });
    }

    const familyDetail = new familyDetailsModel({
      user: user_id,
      name_of_member: name_of_member,
      relationship_with_user: relationship_with_user,
      dob: dob,
    });

    const session = await mongoose.startSession();
    // console.log(user)
    session.startTransaction();
    await familyDetail.save({ session });
    user.familyDetails.push(familyDetail);
    await user.save({ session });
    await session.commitTransaction();

    await familyDetail.save();
    return res.status(200).json({
      success: true,
      msg: "family details added successfully",
      family_detail: familyDetail,
    });
  } catch (error) {
    return res.status(403).json({
      error: error,
      msg: " could not add family detail. Please try again later",
    });
  }
};

export const updateFamilyDetails = async (req, res) => {};
