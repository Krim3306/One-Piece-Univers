import { Link } from "react-router-dom"
import AdminHeader from "../../../Component/Admin/AdminHeader"
import AllTopics from "../../../Component/Admin/Topic/AllTopics"
import "../../../Style/Admin/User/UserDashboard.css"

const TopicDashboardPage = () => {
    return (
        <>
            <AdminHeader />
            
            <ul className="link-create-nav">
                <li className="link-create-li">
                    <Link className="link-to-create" to={'/admin/topic/create'}>AdminCreateTopicPage</Link>
                </li>
            </ul>
            <AllTopics />
            
        </>
    )
}

export default TopicDashboardPage;