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
exports.updateProfile = exports.deleteProfile = exports.addProfile = exports.getProfiles = void 0;
const Profile_1 = __importDefault(require("../model/Profile"));
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
        const newProfile = yield Profile_1.default.create(req.body);
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
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProfile = yield Profile_1.default.findByIdAndDelete(req.params.profileId);
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
        const updatedProfile = yield Profile_1.default.findByIdAndUpdate(req.params.profileId, req.body);
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
