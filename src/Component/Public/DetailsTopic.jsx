import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Style/Public/Topic/DetailsTopic.css"

const DetailsTopic = () => {

    const {id} = useParams();

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/topics/" + id)
            .then((response) => {
            return response.json();
        })
        .then((topicData) => {
            setTopic(topicData.data)
        });
    },[]) 

    return (
        <div  className="details-topics">
            {
                topic ? (
                    <article className="details-topic">
                        <h3 className="detail-topic-title">{topic.name}</h3>
                        <div>{
                            topic.description ? (
                                <div>
                                    <p className="other-detail-topic">Description :</p>
                                    <p className="other-detail-topic">{topic.description}</p>
                                </div>
                            ) : (
                                <p className="other-detail-topic-unknown">Pas de description renseigné</p>
                            )}
                        </div>
                    </article>
                ) : (
                    <p className="no-topic-found">Topic introuvable</p>
                )
            }
        </div>
    )
}

export default DetailsTopic;