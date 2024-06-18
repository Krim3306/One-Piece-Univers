import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyToken } from "../../../Utils/auth";

const AdminCreateTopic = () => {

    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    const decodedToken = useVerifyToken();

    useEffect(() => {
        if (decodedToken && decodedToken.role !== 1) {
            navigate("/");
        }
    }, [decodedToken, navigate]);

    const handleCreateTopic = (event) => {
        event.preventDefault()

    const name = event.target.name.value;
    const description = event.target.description.value;

    const dataJsonAll = {
        name: name,
        description: description,
    }

        const loginDataJson = JSON.stringify(dataJsonAll);

        fetch("http://localhost:3000/api/topics", {
        method: "POST",
        body: loginDataJson,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })
        .then((response) => {
            if (response.status === 200) {
                navigate("/admin/topic");
            } else {
                setMessage("Création du topic échouée");
            };
        });
    };

    return (
        <>
        {decodedToken && decodedToken.role === 1 && (
            <>
            <p>{message}</p>
            <form className="admin-create-form" onSubmit={handleCreateTopic}>
                <div>
                    <label>
                        Titre
                        <input className="admin-create-input" type="text" name="name" />
                    </label>
                </div>
                <div>
                    <label>
                        Description
                        <input className="admin-create-input" type="text" name="description" />
                    </label>
                    </div>
                
                    <input className="admin-create-submit" type="submit" value="Créer" />
            </form>
            </>
            )}
        </>
    )
}

export default AdminCreateTopic;