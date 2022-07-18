import AddProfile from "../AddProfile/AddProfile";
import ProfileList from "../ProfileList/ProfileList";
import 'bootstrap/dist/css/bootstrap.css';

export default function ProfilePage() {
    return (
        <div className="container-fluid">
            <h1>Profiles Page</h1>
            <div className="row">
                <AddProfile />
                <ProfileList />
            </div>
        </div>

    );
}