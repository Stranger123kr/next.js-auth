import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("DATABASE CONNECT SUCCESSFULLY");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDb connection error, please make sure db is up and running:" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log(error);
    console.log("Something Went Wrong in connecting to DB");
  }
}
