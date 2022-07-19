"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.deleteProfile = exports.clearProfiles = exports.addProfile = exports.getProfiles = void 0;
const Profile_1 = __importDefault(require("../model/Profile"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});
const s3 = new aws_sdk_1.default.S3({
    params: { Bucket: process.env.S3_BUCKET },
    region: process.env.REGION,
});
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield Profile_1.default.find({});
        res
            .status(200)
            .json({
            profiles: profiles
        });
    }
    catch (error) {
        res
            .status(400)
            .json({
            msg: String(error)
        });
    }
});
exports.getProfiles = getProfiles;
const addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProfile = yield Profile_1.default.create({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            profile_picture: req.files ? true : false
        });
        if (req.files) {
            let file = req.files.profile_picture;
            yield s3.putObject({
                ACL: 'public-read',
                ContentType: 'image/png',
                Body: file.data,
                Bucket: process.env.S3_BUCKET,
                Key: `${newProfile._id}.png`
            }).promise();
        }
        res
            .status(200)
            .json({
            msg: "Profile Added Successfully",
            profile: newProfile
        });
    }
    catch (error) {
        res
            .status(400)
            .json({
            msg: String(error)
        });
    }
});
exports.addProfile = addProfile;
const clearProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield Profile_1.default.find({});
        for (const profile of profiles) {
            yield s3.deleteObject({
                Bucket: process.env.S3_BUCKET,
                Key: `${profile._id}.png`
            }).promise();
        }
        yield Profile_1.default.deleteMany({});
        res
            .status(200)
            .json({
            msg: "Profile Cleared Successfully"
        });
    }
    catch (error) {
        res
            .status(400)
            .json({
            msg: String(error)
        });
    }
});
exports.clearProfiles = clearProfiles;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProfile = yield Profile_1.default.findByIdAndDelete(req.params.profileId);
        yield s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: `${req.params.profileId}.png`
        }).promise();
        res
            .status(200)
            .json({
            msg: "Profile Deleted Successfully",
            profile: deletedProfile
        });
    }
    catch (error) {
        res
            .status(400)
            .json({
            msg: String(error)
        });
    }
});
exports.deleteProfile = deleteProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProfile = yield Profile_1.default.findByIdAndUpdate(req.params.profileId, {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            profile_picture: req.files ? true : false
        });
        if (req.files) {
            let file = req.files.profile_picture;
            yield s3.putObject({
                ACL: 'public-read',
                ContentType: 'image/png',
                Body: file.data,
                Bucket: process.env.S3_BUCKET,
                Key: `${req.params.profileId}.png`
            }).promise();
        }
        res
            .status(200)
            .json({
            msg: "Profile Deleted Successfully",
            profile: updatedProfile
        });
    }
    catch (error) {
        res
            .status(400)
            .json({
            msg: String(error)
        });
    }
});
exports.updateProfile = updateProfile;
