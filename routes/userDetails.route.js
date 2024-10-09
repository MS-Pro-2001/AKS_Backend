import express from "express";
import {
  updateUser,
  addFamilyDetails,
  fetchAllUsers,
  fetchFamilyDetails,
  fetchSingleUser,
  updateFamilyDetails,
  // uploadPhoto,
} from "../controllers/userDetails.controller.js";

const router = express.Router();

router.get("/fetchallusers", fetchAllUsers);
router.get("/fetchSingleUser/:id", fetchSingleUser);
router.put("/UpdateUser", updateUser);

router.post("/add-family-details", addFamilyDetails);
router.get("/fetchFamilyDetails/:_id", fetchFamilyDetails);
router.post("/upateFamilyDetails", updateFamilyDetails);
// router.post("/uploadPhoto", uploadPhoto);

export default router;
