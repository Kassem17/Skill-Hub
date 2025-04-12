import { connectDB } from "./database.js";
import path from "path";
import crypto from "crypto";
import { GridFsStorage } from "@multer-gridfs-storage";

let gfs;
connectDB().once("open", () => {
  const Grid = require("gridfs-stream");
  gfs = Grid(connectDB().db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

module.exports = { upload, gfs };
