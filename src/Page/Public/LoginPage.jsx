import { Link } from "react-router-dom";
import Footer from "../../Component/Footer"
import Header from "../../Component/Header"
import LoginForm from "../../Component/Public/LoginForm";

const LoginPage = () => {
    return (
        <>
            <Header />

            <LoginForm />

            <Footer />
        </>
    )
}

export default LoginPage;