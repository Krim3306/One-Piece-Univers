import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Style/Public/LoginForm.css"

const LoginForm = () => {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleLogin = (event) => {
        event.preventDefault()

        const username = event.target.username.value;
        const password = event.target.password.value;

        const loginData = {
            username: username,
            password: password
        };

        const loginDataJson = JSON.stringify(loginData);

        fetch('http://localhost:3000/api/users/login',{
            method: "POST",
            body: loginDataJson,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            })
            .then((response) => {
                if (response.status === 200) {
                    navigate("/");
                } else {
                    setMessage("Connexion échouée");
                };
            })
    }

    return (
        <section className="loginform">
            <h3>LoginForm Test</h3>
            <p>{message}</p>
            <form onSubmit={handleLogin}>
                <label>
                    Identifiant : 
                    <input className="input-identifiant-connexion" type="text" name="username" />
                </label>
                <label>
                    Mot De Passe : 
                    <input className="input-mdp-connexion" type="password" name="password" />
                </label>
                <input className="input-se-connecter" type="submit" value="Se Connecter" />
            </form>
            <p>Vous n'avez pas encore de compte ? <Link to={'/signup'}>Inscrivez-vous ici</Link></p>
        </section>
    )
}

export default LoginForm;