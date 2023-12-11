import express from "express";
import { UpdateUser, addFamilyDetails, fetchAllUsers, fetchFamilyDetails, fetchSingleUser, updateFamilyDetails } from "../controllers/userDetails.controller.js";

const router = express.Router();


router.get("/fetchallusers", fetchAllUsers)
router.post("/fetchSingelUser", fetchSingleUser)
router.post("/UpdateUser", UpdateUser)


router.post("/add-family-details", addFamilyDetails)
router.post("/fetchFamilyDetails", fetchFamilyDetails)
router.post("/upateFamilyDetails", updateFamilyDetails)



export default router;