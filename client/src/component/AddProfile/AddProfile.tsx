import React from "react";

import ReInputField from "../ReInputField/ReInputField";

import { addProfile } from "../../redux/profilesAction";
import { Data } from "../../redux/profilesReducer";

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

    const addProfileToStore = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addProfile(inputs);
    }

    return (
        <div>
            <h3>Add Profile</h3>
            <form onSubmit={addProfileToStore}>
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