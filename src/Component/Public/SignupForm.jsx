import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Style/Public/SignupForm.css"

const Signup = () => {

    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    const handleCreateUser = (event) => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value
        const email = event.target.email.value

        const loginData = {
            username: username,
            password: password,
            email: email
        };

        const loginDataJson = JSON.stringify(loginData);

        fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        body: loginDataJson,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })
        .then((response) => {
            if (response.status === 200) {
                navigate("/login");
            } else {
                setMessage("Création de l'utilisateur échouée");
            };
        });
    };

    return (
        <>
            <p>{message}</p>
            <form className="signupform" onSubmit={handleCreateUser}>
            <div>
                <label>
                    UserName
                    <input className="input" type="text" name="username" />
                </label>
            </div>
            <div>
                <label>
                    Mot de Passe
                    <input className="input" type="password" name="password" />
                </label>
            </div>
            <div>
                <label>
                    Email
                    <input className="input" type="email" name="email" />
                </label>
            </div>
            
                <input className="input-create" type="submit" value="Créer" />
            </form>
            <p>Déjà inscrit ? <Link to={'/login'}>Connectez-vous ici</Link></p>
        </>
    )
}

export default Signup;