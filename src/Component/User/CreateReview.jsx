import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Style/Public/Review/CreateReview.css"

const CreateReview = () => {
    const { id } = useParams();
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const [reviews, setReviews] = useState([]);

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
            .then((response) => response.json())
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
                setReviews(data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, [needsRefresh, id]);

    return (
        <>
            <h3>CreateReview Test</h3>
            <form onSubmit={handleCreateReview}>
                <div>
                    <label>
                        Commentaire: 
                        <input type="text" name="content" />
                    </label>
                    <label>
                        Note: 
                        <input type="number" name="rating" />
                    </label>
                </div>

                <input type="submit" value="Créer" />
            </form>
            {/* <div>
                <h3>Reviews</h3>
                {reviews.map((review) => (
                    <article key={review.id}>
                        <h3>{review.User.username}</h3>
                        <p>{review.content} - {review.rating}</p>
                    </article>
                    
                ))}
            </div> */}
        </>
    );
};

export default CreateReview;