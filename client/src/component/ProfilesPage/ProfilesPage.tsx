import AddProfile from "../AddProfile/AddProfile";
import ProfileList from "../ProfileList/ProfileList";

export default function ProfilePage() {
    return (
        <div>
            <h1>Profiles Page</h1>
            <AddProfile />
            <ProfileList />
        </div>

    );
}