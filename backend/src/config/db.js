import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dburl = process.env.ATLAS_DB_URL;

async function main() {
  await mongoose.connect(dburl);
  console.log("connection successful");
}

main().catch((err) => {
  console.log(err);
});