import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyToken } from "../../../Utils/auth";

const AllTopics = () => {

    const [topics, setTopics] = useState([]);

    const [needsRefresh, setNeedRefresh] = useState(false);

    const navigate = useNavigate();

    const decodedToken = useVerifyToken();

    useEffect(() => {
        if (decodedToken && decodedToken.role !== 1) {
            navigate("/");
        }
    }, [decodedToken, navigate]);

    useEffect(() => {
        fetch("http://localhost:3000/api/topics")
            .then((response) => {
            return response.json();
        })
        .then((topicData) => {
            setTopics(topicData.data)
        });
    },[needsRefresh])

    const handleDelete = ((event, topicId) => {
        event.preventDefault();

        fetch("http://localhost:3000/api/topics/" + topicId,{
            method: "DELETE",
            credentials: "include",
        }).then((response) => {
            if(response.status === 401) 
            navigate("/login")
            setNeedRefresh(!needsRefresh);
        });
    })
    
    return (
        <>
            {decodedToken && decodedToken.role === 1 && (
                
                    topics.map((topic) => {
                        return (
                            <article className="admin" key={topic.id}>
                                <h3 className="admin-name">{topic.name}</h3>
                                <form className="admin-delete-form" onSubmit={handleDelete}>
                                    <Link className="admin-update-link" to={`/admin/topic/update/${topic.id}`}>Modifier</Link>
                                    <button className="amdin-delete-submit" onClick={(event) => handleDelete(event, topic.id)}>Supprimer</button>
                                </form>
                            </article>
                        )
                    })
            )}
        </>
    )
}

export default AllTopics;