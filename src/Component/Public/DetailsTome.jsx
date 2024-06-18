import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Style/Public/Tome/DetailsTome.css"

const DetailsTome = () => {

    const {id} = useParams();

    const [tome, setTome] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/tomes/" + id)
            .then((response) => {
            return response.json();
        })
        .then((tomeData) => {
            setTome(tomeData.data)
        });
    },[]) 

    return (
        <div className="details-tomes">
            {
                tome ? (
                    <article className="details-tome">
                        <h3 className="detail-tome-title">{tome.title}</h3>
                        <div>{
                            tome.tome_number ? (
                                <p className="other-detail-tome">Tome number : {tome.tome_number}</p>
                            ) : (
                                <p className="other-detail-unknown">Pas de numéro de Tome renseigné</p>
                            )}
                        </div>
                        <div>{
                            tome.tome_japan_date_publish ? (
                                <p className="other-detail-tome">Date de publication au Japon : {tome.tome_japan_date_publish}</p>
                            ) : (
                                <p className="other-detail-unknown">Pas de de publication au Japon renseigné</p>
                            )}
                        </div>
                        <div>{
                            tome.tome_french_date_publish ? (
                                <p className="other-detail-tome">Date de publication en France : {tome.tome_french_date_publish}</p>
                            ) : (
                                <p className="other-detail-unknown">Pas de de publication en France renseigné</p>
                            )}
                        </div>
                    </article>
                ) : (
                    <p className="no-tome-found">Tome introuvable</p>
                )
            }
        </div>
    )
}

export default DetailsTome;