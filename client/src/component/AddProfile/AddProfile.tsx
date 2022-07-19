import React from "react";
import axios from "axios";

import ReInputField from "../ReInputField/ReInputField";
import { addProfile } from "../../redux/profilesAction";
import 'bootstrap/dist/css/bootstrap.css';

export default function AddProfile() {
    const [inputs, setInputs] = React.useState({
        name: "",
        email: "",
        phone_number: ""
    });
    const [image, setImage] = React.useState<File>();
    const [imageBase64, setImageBase64] = React.useState<string>("");

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputs = { ...inputs };
        newInputs[event.target.name as keyof typeof inputs] = event.target.value;
        setInputs(newInputs);
    }

    const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
            if (event.target.files && event.target.name === "profile_picture") {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = function () {
                    setImageBase64(String(reader.result));
                }
            }
        }
    }

    const createProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("profile_picture", image!);
        for (const [key, value] of Object.entries(inputs)) {
            formData.append(key, value);
        }

        axios
            .post("/profile", formData)
            .then((res) => {
                addProfile(res.data.profile)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="col-xl-6" >
            <h3>Add Profile</h3>
            <form onSubmit={createProfile}>
                <ReInputField name="profile_picture" value={imageBase64} changeInput={changeImage} disabled={false} />
                {
                    Object.keys(inputs).map((key: string) => {
                        return <ReInputField key={key} name={key} value={inputs[key as keyof typeof inputs]} changeInput={changeInput} disabled={false} />
                    })
                }
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}