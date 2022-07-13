import React from "react";
import { Data } from "../../redux/profilesReducer";

interface Input {
    profile: Data,
    index: number
}

export default function ProfileCard(props: Input) {
    const [editable, setEditable] = React.useState<boolean>(false);

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
                        <button>Delete</button>
                    </>
            }
            <p>Profile Card</p>
        </div>
    )
}