// imports

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";

// routes import
import authRoute from "./routes/auth.route.js";
import userDetailsRoute from "./routes/userDetails.route.js";
import multer from "multer";
import path from "path";

const app = express();

import cloudinary from "cloudinary";
import userModel from "./models/user.model.js";

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
dotenv.config();
const port = process.env.PORT;

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connection to Database

const connectToDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database".bgBlue.black);
  } catch (error) {
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (_, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg,jpg,png)");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB,
  fileFilter: function (req, file, cb) {
    try {
      if (!file) {
        return "Please attach file";
      }
      checkFileType(file, cb);
    } catch (error) {
      return error;
    }
  },
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userDetailsRoute);
app.post(
  "/api/uploadPhoto/:id",
  upload.single("familyPhoto"),
  async (req, res) => {
    console.log(req.params);

    try {
      if (!req.file) {
        res.status(500).json({ msg: "Please attach an Image" });
      } else {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "aks/aks_family_photos/",
        });

        // Call the updateUser function
        const updateResult = await userModel
          .findOneAndUpdate(
            { _id: req.params.id },
            { familyPhoto: result.secure_url },
            { new: true }
          )
          .select("-password");
        console.log({ updateResult });

        // Send the Cloudinary URL in the response

        res.status(200).json({
          msg: "Image uploaded successfully",
          imageUrl: result.secure_url,
        });
        // Upload image to Cloudinary
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error uploading image to Cloudinary" });
    }
  }
);

app.listen(port, () => {
  console.log(`listening to port ${port}`.bgMagenta);
  connectToDb();
});
