import multer from "multer";
import crypto from "crypto";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    callback(null, fileName);
  },
});
