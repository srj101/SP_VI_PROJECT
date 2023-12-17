import express from "express";

import {
  createProfession,
  deleteProfession,
  findProfessionsInterestByUserID,
  getProfessionById,
  getProfessions,
  isFollowing,
  ProfessionsFollow,
  ProfessionsUser,
  UnFollowProfession,
  updateProfession,
} from "../controllers/profession.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/professions", getProfessions);
router.get("/professions/:id", getProfessionById);
router.get("/professions/users/:id", ProfessionsUser);
router.get("/isFollowing", isFollowing)
router.get("/professions/interest/:id", findProfessionsInterestByUserID)
// ---------------------  POST ---------------------
router.post("/createProfession", createProfession);
router.post("/professionFollow", ProfessionsFollow)


// ---------------------  PUT ---------------------
router.put("/updateProfession/:id", updateProfession);

// ---------------------  DELETE ---------------------
router.delete("/deleteProfession/:id", deleteProfession);
router.delete("/professionUnfollow/:professionId", UnFollowProfession)

export default router;
