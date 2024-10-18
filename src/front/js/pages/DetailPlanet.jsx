import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";

export const DetailPlanet = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getPlanetDetails(params.uid); 
    }, [actions, params.uid]);


    return (
        <div className="container">
            {!store.currentPlanet.name ? (  
                <Spinner />
            ) : (
                <div className="col">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`} 
                                    className="img-fluid rounded-start" 
                                    alt={store.currentPlanet.name} 
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{store.currentPlanet.name}</h5>
                                    <p>Climate: {store.currentPlanet.climate}</p>
                                    <p>Diameter: {store.currentPlanet.diameter}</p>
                                    <p>Gravity: {store.currentPlanet.gravity}</p>
                                    <p>Orbital Period: {store.currentPlanet.orbital_period}</p>
                                    <p>Population: {store.currentPlanet.population}</p>
                                    <p>Terrain: {store.currentPlanet.terrain}</p>
                                    <p>Surface Water: {store.currentPlanet.surface_water}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
