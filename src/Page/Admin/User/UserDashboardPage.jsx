import { Link } from "react-router-dom";
import AllUsers from "../../../Component/Admin/User/AllUsers";
import AdminHeader from "../../../Component/Admin/AdminHeader";

import "../../../Style/Admin/User/UserDashboard.css"

const UserDashboardPage = () => {
    return (
        <>
            <AdminHeader />

            <ul className="link-create-nav">
                <li className="link-create-li">
                    <Link className="link-to-create" to={'/admin/user/create'}>AdminCreateUserPage</Link>
                </li>
            </ul>
            <AllUsers />

        </>
    )
}

export default UserDashboardPage;