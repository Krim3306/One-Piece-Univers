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