import React from "react";
import axios from "axios";
import { Data } from "../../redux/profilesReducer";
import { deleteProfile, updateProfile } from "../../redux/profilesAction";
import { profile } from "console";
import ReInputField from "../ReInputField/ReInputField";
import { isDisabled } from "@testing-library/user-event/dist/utils";

interface Input {
    profile: Data
}

export default function ProfileCard(props: Input) {
    const [editable, setEditable] = React.useState<boolean>(false);
    const [inputs, setInputs] = React.useState<Data>(props.profile);

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    }

    const removeProfile = () => {
        axios
            .delete(`/profile/${props.profile._id}`)
            .then((res) => {
                deleteProfile(res.data.profile);
            })
            .catch((err) => console.log(err));
    }

    const updateProfileToDB = () => {
        axios
            .put(`/profile/${props.profile._id}`, inputs)
            .then((res) => {
                updateProfile(res.data.profile);
            })
            .catch((err) => console.log(err));
    }

    return (
        <form>
            <h5>Profile Card
                {
                    editable ?
                        <>
                            <button type="button" className="btn btn-primary" onClick={() => { updateProfileToDB() }}>Save</button>
                            <button type="button" className="btn btn-primary" onClick={() => { setEditable(!editable) }}>Cancel</button>
                        </> :
                        <>
                            <button type="button" className="btn btn-primary" onClick={() => { setEditable(!editable) }}>Edit</button>
                            <button type="button" className="btn btn-primary" onClick={removeProfile}>Delete</button>
                        </>
                }
            </h5>
            <div>
                <label htmlFor="profile_picture">Profile Picture</label>
                <input type="file" name="profile_picture" className="form-control" />
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="form-control" onChange={changeInput} value={inputs.name} disabled={!editable} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" onChange={changeInput} value={inputs.email} disabled={!editable} />
            </div>
            <div>
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" name="phone_number" className="form-control" onChange={changeInput} value={inputs.phone_number} disabled={!editable} />
            </div>
        </form>
    )
}