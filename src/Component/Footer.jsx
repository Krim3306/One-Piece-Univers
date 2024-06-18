import { Link } from "react-router-dom"
import "../Style/Public/Footer.css"

const Footer = () => {
    return (
        <footer>
            <p>&#169; Copyright Regrag Karim</p>
            <ul>
                <li>
                    <Link to={'/contact'}>ContactPage</Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;