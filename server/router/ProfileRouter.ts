import { Request, Response } from 'express';
import Profile from "../model/Profile";

export const getProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await Profile.find({});

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
            })
    }
};

export const addProfile = async (req: Request, res: Response) => {
    try {
        const newProfile = await Profile.create(req.body);

        res
            .status(200)
            .json({
                msg: "Profile Added Successfully",
                profile: newProfile
            })
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: String(error)
            })
    }
}

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.profileId);

        res
            .status(200)
            .json({
                msg: "Profile Deleted Successfully",
                profile: deletedProfile
            })
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: String(error)
            })
    }
}   