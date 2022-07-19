import { useSelector } from 'react-redux';
import { Data } from "../../redux/profilesReducer";
import { clearProfiles } from '../../redux/profilesAction';

import ProfileCard from "../ProfileCard/ProfileCard";
import axios from 'axios';

export default function ProfileList() {
    const profiles = useSelector((state: Data[]) => (state))

    const clear = () => {
        clearProfiles();

        axios
            .delete("/profiles")
            .then((res) => {
                console.log(res.data.msg);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="col-xl-6">
            <h3>Profile List <button className="btn btn-primary" onClick={clear}>Clear</button></h3>
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