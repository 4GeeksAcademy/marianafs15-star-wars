import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Characters = () => {
    const { store } = useContext(Context);

    return (
        <div className="container my-3">
            <h1 className="text-center text-primary">Characters</h1>
            {store.characters.map(() =>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            )}
        </div>
    )
}