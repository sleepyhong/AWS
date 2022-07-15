import mongoose from "mongoose";
const MONGO_KEY: string = process.env.MONGO_KEY!;

mongoose
    .connect(MONGO_KEY)
    .then(() => {
        console.log("Successfully Connected to the Database");
    })
    .catch((err) => {
        console.log(err);
    });