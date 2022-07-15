import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    profile_picture: String
});

export default mongoose.model("Profile", profileSchema);