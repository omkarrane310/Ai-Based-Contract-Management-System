import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  analyzeContract,
  detectAndConfirmContractType,
  getContractByID,
  getUserContracts,
  uploadMiddleware,
  deleteContractByID,
} from "../controllers/contract.controller";
import { handleErrors } from "../middleware/errors";

const router = express.Router();

router.post(
  "/detect-type",
  isAuthenticated,
  uploadMiddleware,
  handleErrors(detectAndConfirmContractType)
);

router.post(
  "/analyze",
  isAuthenticated,
  uploadMiddleware,
  handleErrors(analyzeContract)
);

router.get("/user-contracts", isAuthenticated, handleErrors(getUserContracts));
router.get("/contract/:id", isAuthenticated, handleErrors(getContractByID));
router.delete("/contract/:id", isAuthenticated, handleErrors(deleteContractByID));

export default router;
