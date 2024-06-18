import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyToken } from "../../../Utils/auth";

const AllTomes = () => {
    
    const [tomes, setTomes] = useState([]);

    const [needsRefresh, setNeedRefresh] = useState(false);

    const navigate = useNavigate();

    const decodedToken = useVerifyToken();

    useEffect(() => {
        if (decodedToken && decodedToken.role !== 1) {
            navigate("/");
        }
    }, [decodedToken, navigate]);

    useEffect(() => {
        fetch("http://localhost:3000/api/tomes")
            .then((response) => {
            return response.json();
        })
        .then((topicData) => {
            setTomes(topicData.data)
        });
    },[needsRefresh])

    const handleDelete = ((event, tomeId) => {
        event.preventDefault();

        fetch("http://localhost:3000/api/tomes/" + tomeId,{
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
                tomes.map((tome) => {
                    return (
                        <article className="admin" key={tome.id}>
                            <h3 className="admin-name">{tome.title}</h3>
                            <form className="admin-delete-form" onSubmit={handleDelete}>
                                <Link className="admin-update-link" to={`/admin/tome/update/${tome.id}`}>Modifier</Link>
                                <button className="amdin-delete-submit" onClick={(event) => handleDelete(event, tome.id)}>Supprimer</button>
                            </form>
                        </article>
                    )
                })
            )}
        </>
    )
}

export default AllTomes;