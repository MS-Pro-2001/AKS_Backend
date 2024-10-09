import userModel from "../models/user.model.js";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// const JWT_secret = "this_is_secrete_code"

// export const authenticateUser = ()=>{

// }

// ######### Note ################
// errorTypes
// error->red color
// warning->orange color
// info->bluecolor
// success-> green color

export const registerUser = async (req, res) => {
  console.log(req.body);

  // const salt = await bcrypt.genSalt(10);
  // const secpass = await bcrypt.hash(req.body.password, salt);

  const user = await userModel.findOne({ phone_no: req.body.phone_no });

  if (!user) {
    try {
      const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phone_no: req.body.phone_no,
        ward: req.body.ward,
        address: req.body.address,
        dob: req.body.dob,
        familyPhoto: req.body.familyPhoto,
      });
      await user.save();

      // var token = jwt.sign({user:user.username},JWT_secret)
      res.status(200).json({
        user: user,
        msg: "User Registered Successfully",
        success: true,
        type: "success",
      });
      console.log(user.firstName, "registered");
    } catch (error) {
      res.status(403).json({
        msg: error.message,
        error: error.message,
        type: "warning",
        success: false,
      });
    }
  } else {
    res.status(400).json({
      msg: "Please Login! User already exists",
      type: "warning",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ phone_no: req.body.phone_no });

    // console.log({ user });

    // const match = await bcrypt.compare(req.body.password, user.password)

    if (
      req.body.phone_no === user.phone_no &&
      req.body.password === user.password
    ) {
      console.log(user.firstName, "logged in");

      res.status(200).json({
        msg: "User logged in successfully",
        user: user,
        type: "success",
        success: true,
      });
      // var token = jwt.sign({user:user.username},JWT_secret)
      // res.status(200).json({token:token,user:user,msg:"Logged in Successfully"})
    } else {
      res.status(400).json({
        msg: "Invalid email or password",
        type: "error",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "User doesnot exist. Please register first",
      type: "error",
      success: false,
    });
  }
};

// }

// export const updateUser = async (req, res) => {
//   console.log({ req });
//   try {
//     const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     console.log(user);

//     if (user) {
//       res.status(200).json({ msg: "User updated in successfully", user: user });
//     } else {
//       res
//         .status(400)
//         .json({ msg: "couldnot update user. Please try again later" });
//     }
//   } catch (error) {
//     res.status(400).json({ msg: "User doesnot exist. Please register first" });
//   }
// };
// export const deleteUser = async (req, res) => {
//     try {
//         const user = await userModel.findByIdAndDelete(req.params.id)

//         if (user) {

//             res.status(200).json({ msg: "User deleted successfully" })

//         } else {
//             res.status(400).json({ msg: "user does not exist" })
//         }

//     } catch (error) {
//         res.status(400).json({ msg: "User doesnot exist. Please register first" })

//     }

// }
