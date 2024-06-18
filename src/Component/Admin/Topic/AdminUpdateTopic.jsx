import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Style/Admin/User/AdminUpdateUser.css"
import { useVerifyToken } from "../../../Utils/auth";

const AdminUpdateTopic = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const decodedToken = useVerifyToken();

    useEffect(() => {
        if (decodedToken && decodedToken.role !== 1) {
            navigate("/");
        }
    }, [decodedToken, navigate]);

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/topics/" + id, {
        method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .then((topicData) => {
            setTopic(topicData.data);
        });
    }, []);

    const handleUpdateTopic = (event) => {
        event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;

    const dataJsonAll = {
        name: name,
        description: description
    }

    const dataJson = JSON.stringify(dataJsonAll)
    
        fetch("http://localhost:3000/api/topics/" + id, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: dataJson,
          credentials: "include",
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Topic modifié", data);
            navigate('/admin/topic')
        });
    };

    return (
        <>
            {decodedToken && decodedToken.role === 1 && (
                topic && (
                <form className="admin-update-form" onSubmit={handleUpdateTopic}>
                    <div className="admin-update-section">
                        <label>
                            Nom
                            <input type="text" name="name" defaultValue={topic.name} />
                        </label>
                    </div>
                    <div className="admin-update-section">
                        <label>
                            Description
                            <input type="text" name="description" defaultValue={topic.description} />
                        </label>
                    </div>
                    <input className="admin-update-submit" type="submit" value="Valider modification" />
                </form>
                )
            )}
        </>
    )
}

export default AdminUpdateTopic;