import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Style/Public/Review/AllReviews.css"

const AllReview = () => {

    const {id} = useParams();
    const [review, setReview] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/reviews/" + id)
            .then((response) => {
                return response.json();
            })
            .then((reviewData) => {
                console.log(reviewData);
                setReview(reviewData)
            })
    }, [id])

    if (review.length === 0) {
        return <p className="no-review">Aucun commentaire</p>
    }

    return (
        <section className="reviews">
            {
                review.map((review) => {
                return(
                    <article className="review" key={review.id}>
                        <h3 className="review-username">{review.User.username}</h3>
                        <p className="review-content">{review.content}</p>
                    </article>
                )
                })
            }
        </section>
    )
}

export default AllReview;