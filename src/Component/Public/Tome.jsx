import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Style/Public/Tome/Tome.css"

const Tome = () => {

    const [tomes, setTomes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/tomes")
            .then((response) => {
            return response.json();
        })
        .then((tomeData) => {
            setTomes(tomeData.data)
        });
    },[])

    return (
        <div className="tomes">
            <h3 className="all-tomes">Retrouvez tous les Tomes de One Piece !</h3>
            <div className="tome-position">
                {
                    tomes.map((tome) => {
                        return (
                            <article className="tome" key={tome.id}>
                                <h3 className="tome-title">{tome.title}</h3>
                                <Link className="tome-details-link" to={`/tome/${tome.id}`}>Voir les détails</Link>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tome;