import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";


export const DataRow = ({category}) => {
    const { store } = useContext(Context);
    const backupSource = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
    const [imageError, setImageError] = useState(false)
    const handleError = () => {
    setImageError(true)
    }

    return (
        <div className="container my-3 bg-dark">
            <h1 className="text-center text-light">Characters</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {store[category].map((item) =>
                    <div key={item.uid} className="col">
                        <div className="card border-dark my-3 mx-2 text-bg-dark">
                            <img src={!imageError ? `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`:backupSource} className="card-img-top" alt="..."
                                onError={handleError} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/characters/${item.uid}`} className="btn btn-dark">Detalles</Link>
                                    <i className="far fa-heart fa-3x text-danger"></i>
                                    <i className="fas fa-heart fa-3x text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}