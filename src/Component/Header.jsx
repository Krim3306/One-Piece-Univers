import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../Style/Public/Header.css"

const checkCookie = (access_token) => {
    return Cookies.get(access_token) !== undefined;
};

const Header = () => {
    const [hasCookie, setHasCookie] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cookieExists = checkCookie('access_token');
        setHasCookie(cookieExists);
    }, []);

//     Voici une explication concise de ce code React :

// Fonction checkCookie
// javascript
// Copier le code
// const checkCookie = (access_token) => {
//     return Cookies.get(access_token) !== undefined;
// };
// But : Vérifier si un cookie nommé access_token existe.
// Fonctionnement : Utilise la méthode Cookies.get (d'une bibliothèque comme js-cookie) pour récupérer le cookie nommé access_token. Si le cookie existe, Cookies.get retourne sa valeur, sinon, elle retourne undefined. La fonction retourne true si le cookie existe et false sinon.
// Composant Header
// javascript
// Copier le code
// const Header = () => {
//     const [hasCookie, setHasCookie] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const cookieExists = checkCookie('access_token');
//         setHasCookie(cookieExists);
//     }, []);
// useState : const [hasCookie, setHasCookie] = useState(false);

// But : Déclare un état hasCookie initialisé à false.
// Fonctionnement : hasCookie contient l'état actuel (s'il y a un cookie access_token ou non) et setHasCookie permet de mettre à jour cet état.
// useNavigate : const navigate = useNavigate();

// But : Fournit une fonction navigate pour effectuer des redirections de page. Vient de React Router.
// useEffect :

// But : Exécuter un effet secondaire (vérification du cookie) lorsque le composant est monté.
// Fonctionnement : La fonction checkCookie('access_token') est appelée pour vérifier l'existence du cookie access_token. Le résultat (true ou false) est stocké dans cookieExists. Ensuite, setHasCookie(cookieExists) met à jour l'état hasCookie en conséquence.
// Dépendances : [] indique que cet effet ne doit s'exécuter qu'une seule fois, lors du montage initial du composant.
// En résumé
// Ce code définit un composant Header qui, à son montage, vérifie si un cookie nommé access_token existe et met à jour l'état hasCookie en fonction de cette vérification. Cela pourrait être utilisé pour conditionner le rendu de certains éléments ou pour rediriger l'utilisateur selon la présence ou l'absence de ce cookie.

    const HandleLogout = (event) => {
        event.preventDefault();

        fetch('http://localhost:3000/api/users/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        .then((response) => {
            if (response.status === 200) {
                navigate("/login");
            } else {
                setMessage("Déconnexion échouée");
            }
        });
    }

    return (
        <header>
            <h1>One Piece Universe</h1>
            <nav>
                <ul>
                    <li>
                        <Link to={'/'}>HomePage</Link>
                    </li>
                    <li>
                        <Link to={'/tome'}>TomePage</Link>
                    </li>
                    <li>
                        <Link to={'/topic'}>TopicPage</Link>
                    </li>
                    <li>
                        <Link to={'/news'}>NewsPage</Link>
                    </li>
                    {hasCookie ? 
                        (
                            <>
                                <li>
                                    <button className="button-logout" onClick={HandleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to={'/login'}>LoginPage</Link>
                            </li>)
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;