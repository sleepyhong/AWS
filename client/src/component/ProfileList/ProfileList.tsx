import { useSelector } from 'react-redux';
import { Data } from "../../redux/profilesReducer";

import ProfileCard from "../ProfileCard/ProfileCard";

export default function ProfileList() {
    const profiles = useSelector((state: Data[]) => (state))

    return (
        <div>
            <h3>Profile List</h3>
            <button>Clear</button>
            <div>
                {
                    profiles.map((profile: Data) => {
                        return <ProfileCard key={profile._id} profile={profile} />
                    })
                }
            </div>
        </div>
    );
}