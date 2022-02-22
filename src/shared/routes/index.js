import { Router } from "express";
import multer from "multer";
import { storage } from "../providers/diskStorageProvider.js";
import { postImagesController } from "../../controllers/postImagesController.js";
import { ensureAuthenticated } from "../../../src/schemas/user/middlewares/ensureAuthenticated.js";

const routes = Router();

const upload = multer({ storage });

routes.get("/", (req, res) => {
  res.send("Server Express is Running!");
});

routes.post(
  "/postImages",
  [ensureAuthenticated, upload.single("file")],
  postImagesController
);

export default routes;
