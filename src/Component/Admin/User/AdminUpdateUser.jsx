import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Style/Admin/User/AdminUpdateUser.css"
import { useVerifyToken } from "../../../Utils/auth";

const AdminUpdateUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const decodedToken = useVerifyToken();

    useEffect(() => {
        if (decodedToken && decodedToken.role !== 1) {
            navigate("/");
        }
    }, [decodedToken, navigate]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/users/" + id, {
        method: "GET",
        credentials: "include",
        })
        .then((response) => {
            if(response.status === 401) 
                navigate("/login")
            return response.json();
        })
        .then((userData) => {
            setUser(userData.data);
        });
    }, []);

    const handleUpdateUser = (event) => {
        event.preventDefault();
        
    const username = event.target.username.value;
    const password = event.target.password.value;
    const address = event.target.address.value;
    const email = event.target.email.value;

    const dataJsonAll = {
        username: username,
        password: password,
        address: address,
        email: email
    }

    const dataJson = JSON.stringify(dataJsonAll)

    fetch("http://localhost:3000/api/users/" + id, {
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
            console.log("User modifié", data);
            navigate('/admin/user')
        });
    };

    return (
        <>
        {decodedToken && decodedToken.role === 1 && (
        
            user && (
                <form className="admin-update-form" onSubmit={handleUpdateUser}>
                    <div className="admin-update-section">
                        <label>
                            UserName
                            <input type="text" name="username" defaultValue={user.username} />
                        </label>
                    </div>
                    <div className="admin-update-section">
                        <label>
                            Mot de passe
                            <input type="text" name="password" defaultValue={user.password} />
                        </label>
                    </div>
                    <div className="admin-update-section">
                        <label>
                            Adresse
                            <input type="text" name="address" defaultValue={user.address} />
                        </label>
                    </div>
                    <div className="admin-update-section">
                        <label>
                            E-mail
                            <input type="text" name="email" defaultValue={user.email} />
                        </label>
                    </div>
                    <input className="admin-update-submit" type="submit" value="Valider modification" />
                </form>
            )
        )}
        </>
    )
}

export default AdminUpdateUser;