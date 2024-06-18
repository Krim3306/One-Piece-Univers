import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Style/Public/Topic/Topic.css"

const Topics = () => {

    const [topics, settopics] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/topics")
            .then((response) => {
            return response.json();
        })
        .then((topicData) => {
            settopics(topicData.data)
        });
    },[])

    return (
        <div className="topics">
            <h3 className="all-topics">Retrouvez tous les Topics autour de One Piece !</h3>
            <div className="topic-position">
                {
                    topics.map((topic) => {
                        return (
                            <article className="topic" key={topic.id}>
                                <h3 className="topic-name">{topic.name}</h3>
                                <Link className="detail-topic-link" to={`/topic/${topic.id}`}>Voir les détails</Link>
                            </article>
                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default Topics;