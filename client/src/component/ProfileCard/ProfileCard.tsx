import React from "react";
import axios from "axios";
import { Data } from "../../redux/profilesReducer";
import { deleteProfile } from "../../redux/profilesAction";

interface Input {
    profile: Data
}

export default function ProfileCard(props: Input) {
    const [editable, setEditable] = React.useState<boolean>(false);

    const removeProfile = () => {
        axios
            .delete(`/profile/${props.profile._id}`)
            .then((res) => {
                deleteProfile(res.data.profile);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            {
                editable ?
                    <>
                        <button>Save</button>
                        <button onClick={() => {setEditable(!editable)}}>Cancel</button>
                    </> :
                    <>
                        <button onClick={() => {setEditable(!editable)}}>Edit</button>
                        <button onClick={removeProfile}>Delete</button>
                    </>
            }
            <p>Profile Card</p>
        </div>
    )
}