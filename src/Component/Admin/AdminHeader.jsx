import { Link } from "react-router-dom";
import "../../Style/Admin/AdminHeader.css"

const AdminHeader = () => {
    return (
        <nav>
            <ul className="admin-navbar">
                <li className="admin-page">
                    <Link to={'/admin'}>AdminHomePage</Link>
                </li>
                <li className="admin-page">
                    <Link to={'/admin/user'}>UserDashboardPage</Link>
                </li>
                <li className="admin-page">
                    <Link to={'/admin/topic'}>TopicDashboardPage</Link>
                </li>
                <li className="admin-page">
                    <Link to={'/admin/tome'}>TomeDashboardPage</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AdminHeader;