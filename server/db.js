"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_KEY = process.env.MONGO_KEY;
mongoose_1.default
    .connect(MONGO_KEY)
    .then(() => {
    console.log("Successfully Connected to the Database");
})
    .catch((err) => {
    console.log(err);
});
