import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Style/Admin/User/AdminUpdateUser.css"
import { useVerifyToken } from "../../../Utils/auth";

const AdminUpdateTome = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tome, setTome] = useState(null);
    
    const decodedToken = useVerifyToken();

    useEffect(() => {
        if (decodedToken && decodedToken.role !== 1) {
            navigate("/");
        }
    }, [decodedToken, navigate]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tomes/${id}`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(tomeData => {
            setTome(tomeData.data);
        })
        .catch(error => console.error('Error fetching tome:', error));
    }, [id]);

    const handleUpdateTome = (event) => {
        event.preventDefault();
        
        const title = event.target.title.value;
        const tome_number = event.target.tome_number.value;
        const tome_japan_date_publish = event.target.tome_japan_date_publish.value;
        const tome_french_date_publish = event.target.tome_french_date_publish.value;

        const dataJsonAll = {
            title,
            tome_number,
            tome_japan_date_publish,
            tome_french_date_publish
        };

        fetch(`http://localhost:3000/api/tomes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataJsonAll),
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
            console.log("Tome modifié", data);
            navigate('/admin/tome');
        })
        .catch(error => console.error('Error updating tome:', error));
    };

    return (
        <>
            {decodedToken && decodedToken.role === 1 && tome && (
                <form className="admin-update-form" onSubmit={handleUpdateTome}>
                    <div className="admin-update-section">
                        <label>
                            Titre
                            <input type="text" name="title" defaultValue={tome.title} />
                        </label>
                    </div>
                    <div className="admin-update-section">
                        <label>
                            Numéro du Tome
                            <input type="number" name="tome_number" defaultValue={tome.tome_number} />
                        </label>
                    </div>
                    <div className="admin-update-section">
                        <label>
                            Date de publication du Tome au Japon
                            <input type="date" name="tome_japan_date_publish" defaultValue={tome.tome_japan_date_publish} />
                        </label>
                    </div>
                    <div className="admin-update-section">
                        <label>
                            Date de publication du Tome en France
                            <input type="date" name="tome_french_date_publish" defaultValue={tome.tome_french_date_publish} />
                        </label>
                    </div>
                    <input className="admin-update-submit" type="submit" value="Valider modification" />
                </form>
            )}
        </>
    )
}

export default AdminUpdateTome;
