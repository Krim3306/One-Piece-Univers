import { Link } from "react-router-dom"
import AdminHeader from "../../../Component/Admin/AdminHeader"
import AllTomes from "../../../Component/Admin/Tome/AllTomes"
import "../../../Style/Admin/User/UserDashboard.css"

const TomeDashboardPage = () => {
    return (
        <>
            <AdminHeader />

            <ul className="link-create-nav">
                <li className="link-create-li">
                    <Link className="link-to-create" to={'/admin/tome/create'}>AdminCreateTomePage</Link>
                </li>
            </ul>
            <AllTomes />

        </>
    )
}

export default TomeDashboardPage;