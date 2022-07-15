import React from "react";
import axios from "axios"

import ReInputField from "../ReInputField/ReInputField";

import { addProfile } from "../../redux/profilesAction";
interface Data {
    profile_picture: string,
    name: string,
    email: string,
    phone_number: string
}

export default function AddProfile() {
    const [inputs, setInputs] = React.useState<Data>({
        profile_picture: "",
        name: "",
        email: "",
        phone_number: ""
    });

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputs: Data = { ...inputs };
        newInputs[event.target.name as keyof typeof inputs] = event.target.value;
        setInputs(newInputs);
    }

    const createProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios
            .post("/profile", inputs)
            .then((res) => {
                addProfile(res.data.profile)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <h3>Add Profile</h3>
            <form onSubmit={createProfile}>
                {
                    Object.keys(inputs).map((key: string) => {
                        return <ReInputField key={key} name={key} value={inputs[key as keyof typeof inputs]} changeInput={changeInput} />
                    })
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}