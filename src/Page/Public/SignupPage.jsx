import { Link } from "react-router-dom";
import Footer from "../../Component/Footer"
import Header from "../../Component/Header"
import SignupForm from "../../Component/Public/SignupForm";

const SignupPage = () => {
    return (
        <>
            <Header />

            <SignupForm />

            <Footer />
        </>
    )
}

export default SignupPage;