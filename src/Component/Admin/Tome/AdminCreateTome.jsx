import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useVerifyTokenRoleId } from "../../../Utils/authGard";
import "../../../Style/Admin/User/AdminCreateUser.css"

const AdminCreateTome = () => {

    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    const handleCreateTome = (event) => {
        event.preventDefault()

    const title = event.target.title.value;
    const tome_number = event.target.tome_number.value;
    const tome_japan_date_publish = event.target.tome_japan_date_publish.value;
    const tome_french_date_publish = event.target.tome_french_date_publish.value;

    const dataJsonAll = {
        title: title,
        tome_number: tome_number,
        tome_japan_date_publish: tome_japan_date_publish,
        tome_french_date_publish: tome_french_date_publish
    }

        const loginDataJson = JSON.stringify(dataJsonAll);

        fetch("http://localhost:3000/api/tomes", {
        method: "POST",
        body: loginDataJson,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })
        .then((response) => {
            if (response.status === 200) {
                navigate("/admin/tome");
            } else {
                setMessage("Création du tome échouée");
            };
        });
    };

    return (
        <>
            <p>{message}</p>
            <form className="admin-create-form" onSubmit={handleCreateTome}>
                <div>
                    <label>
                        Title
                        <input className="admin-create-input" type="text" name="title" />
                    </label>
                </div>
                <div>
                    <label>
                        Numéro du Tome
                        <input className="admin-create-input" type="text" name="tome_number" />
                    </label>
                </div>
                <div>
                    <label>
                        Date de publication du Tome au Japon
                        <input className="admin-create-input" type="text" name="tome_japan_date_publish" />
                    </label>
                </div>
                <div>
                    <label>
                        Date de publication du Tome en France
                        <input className="admin-create-input" type="text" name="tome_french_date_publish" />
                    </label>
                </div>
                
                    <input className="admin-create-submit" type="submit" value="Créer" />
            </form>
        </>
    )
}

export default AdminCreateTome;