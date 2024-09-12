import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";

export const DetailStarShip = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getStarShipDetails(params.uid); 
    }, [actions, params.uid]);

    return (
        <div className="container">
            {!store.currentStarShip.name ? (  
                <Spinner />
            ) : (
                <div className="col">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src={`https://starwars-visualguide.com/assets/img/starships/${params.uid}.jpg`} 
                                    className="img-fluid rounded-start" 
                                    alt={store.currentStarShip.name} 
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{store.currentStarShip.name}</h5>
                                    <p>Model: {store.currentStarShip.model}</p>
                                    <p>Manufacturer: {store.currentStarShip.manufacturer}</p>
                                    <p>Cost in Credits: {store.currentStarShip.cost_in_credits}</p>
                                    <p>Length: {store.currentStarShip.length}</p>
                                    <p>Crew: {store.currentStarShip.crew}</p>
                                    <p>Passengers: {store.currentStarShip.passengers}</p>
                                    <p>Max Atmosphering Speed: {store.currentStarShip.max_atmosphering_speed}</p>
                                    <p>Hyperdrive Rating: {store.currentStarShip.hyperdrive_rating}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
