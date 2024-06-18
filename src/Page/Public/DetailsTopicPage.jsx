import { useParams } from "react-router-dom";
import Footer from "../../Component/Footer"
import Header from "../../Component/Header"
import AllReview from "../../Component/Public/AllReview";
import DetailsTopic from "../../Component/Public/DetailsTopic";
// import CreateReview from "../../Component/User/CreateReview";
import { useEffect, useState } from "react";
import "../../Style/Public/Review/CreateReview.css"
import Cookies from "js-cookie";

const isCookiesPres = ( access_token ) => {
    return Cookies.get(access_token) !== undefined 
}

const DetailsTopicPage = () => {

        const access_token = "access_token";
        const isCookies = isCookiesPres(access_token)

        const { id } = useParams();
        const [needsRefresh, setNeedsRefresh] = useState(false);
        const [reviews, setReviews] = useState(false);
    
        const handleCreateReview = (event) => {
            event.preventDefault();
    
            const content = event.target.content.value;
            const rating = event.target.rating.value;
    
            const reviewData = {
                content: content,
                rating: rating,
                TopicId: id,
            };
    
            const reviewDataJson = JSON.stringify(reviewData);
    
            fetch('http://localhost:3000/api/reviews', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: reviewDataJson,
            })
                .then((response)=>{
                    window.location.reload();
                    response.json()    
                })
                .then((data) => {
                    console.log(data);
                    setNeedsRefresh(!needsRefresh);
                })
                .catch((error) => {
                    console.error("Error creating review:", error);
                });

                
        };

        useEffect(() => {
            fetch(`http://localhost:3000/api/reviews/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setReviews(data.content);
                })
                .catch((error) => {
                    console.error("Error fetching reviews:", error);
                });
        }, [needsRefresh, id]);


    return (
        <>
            <Header />

            <DetailsTopic />
            <section className="create-review">
                {
                    isCookies ? (
                        <>
                            <h3 className="create-review-title">Nouveau commentaire</h3>
                            <form className="review-form" onSubmit={handleCreateReview}>
                                <div className="review-post">
                                    <label className="review-content">
                                        Commentaire: 
                                        <textarea className="review-input-content" type="text" name="content" />
                                    </label>
                                    <label className="review-rating">
                                        Note: 
                                        <input className="review-input-rating" type="number" name="rating" />
                                    </label>
                                </div>

                                <input className="review-submit" type="submit" value="Créer" />
                            </form>
                        </>
                    ) : (
                        <p>Connectez vous pour laisser un commentaire</p>
                    )
                }
                
            </section>
            {/* <CreateReview /> */}
            
            <AllReview />

            <Footer />
        </>
    )
}

export default DetailsTopicPage;