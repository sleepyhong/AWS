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
                    profiles.map((profile: Data, index: number) => {
                        return <ProfileCard key={index} profile={profile} index={index} />
                    })
                }
            </div>
        </div>
    );
}