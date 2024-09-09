import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";


export const Characters = () => {
    const { store } = useContext(Context);

    const handleError = (event) => {
        event.target.src =` https://starwars-visualguide.com/assets/img/placeholder.jpg`;
    }

    return (
        <div className="container my-3">
            <h1 className="text-center text-primary">Characters</h1>
            {store.characters.map(() =>
                <div className="card">
                    <img src="{`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}" className="card-img-top" alt="..."
                    onError={handleError}/>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="d-flex justify-content-between">
                        <Link to="{`/characters/${item.uid}`}" className="btn btn-primary">Detalles</Link>
                        <i class="far fa-heart fa-3x text-danger"></i>
                        <i class="fas fa-heart fa-3x text-danger"></i>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}