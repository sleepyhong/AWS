import { Request, Response } from 'express';
import Profile from "../model/Profile";
import AWS from "aws-sdk";
import { UploadedFile } from 'express-fileupload';

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const s3 = new AWS.S3({
    params: { Bucket: process.env.S3_BUCKET },
    region: process.env.REGION,
})

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
        const newProfile = await Profile.create({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            profile_picture: req.files ? true : false
        });

        if (req.files) {
            let file = req.files.profile_picture as UploadedFile;
            await s3.putObject({
                ACL: 'public-read',
                ContentType: 'image/png',
                Body: file.data,
                Bucket: process.env.S3_BUCKET!,
                Key: `${newProfile._id}.png`
            }).promise();
        }

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

export const clearProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await Profile.find({});
        for (const profile of profiles) {
            await s3.deleteObject({
                Bucket: process.env.S3_BUCKET!,
                Key: `${profile._id}.png`
            }).promise();
        }

        await Profile.deleteMany({});

        res
            .status(200)
            .json({
                msg: "Profile Cleared Successfully"
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

        await s3.deleteObject({
            Bucket: process.env.S3_BUCKET!,
            Key: `${req.params.profileId}.png`
        }).promise();

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

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.profileId, {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            profile_picture: req.files ? true : false
        });

        if (req.files) {
            let file = req.files.profile_picture as UploadedFile;
            await s3.putObject({
                ACL: 'public-read',
                ContentType: 'image/png',
                Body: file.data,
                Bucket: process.env.S3_BUCKET!,
                Key: `${req.params.profileId}.png`
            }).promise();
        }

        res
            .status(200)
            .json({
                msg: "Profile Deleted Successfully",
                profile: updatedProfile
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