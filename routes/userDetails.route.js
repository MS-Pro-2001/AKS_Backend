import express from "express";
import {
  updateUser,
  addFamilyDetails,
  fetchAllUsers,
  fetchFamilyDetails,
  fetchSingleUser,
  updateFamilyDetails,
} from "../controllers/userDetails.controller.js";

const router = express.Router();

router.get("/fetchallusers", fetchAllUsers);
router.post("/fetchSingleUser/:id", fetchSingleUser);
router.put("/UpdateUser", updateUser);

router.post("/add-family-details", addFamilyDetails);
router.get("/fetchFamilyDetails/:_id", fetchFamilyDetails);
router.post("/upateFamilyDetails", updateFamilyDetails);

export default router;
