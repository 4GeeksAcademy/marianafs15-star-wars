import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";


export const DetailCharacters = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getCharacterDetails(params.uid)
    }, [])

    return (
        <div className="container">
            {!store.currentCharacter.name ?
                 <Spinner />
                :
                <div className="col">
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="..." class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <p>Height: {store.currentCharacter.height}</p>
                                    <p>Mass: {store.currentCharacter.mass}</p>
                                    <p>Hair color: {store.currentCharacter.hair_color}</p>
                                    <p>{store.currentCharacter.skin_color}</p>
                                    <p>{store.currentCharacter.eye_color}</p>
                                    <p>{store.currentCharacter.birth_year}</p>
                                    <p>{store.currentCharacter.gender}</p>
                                    <p>{store.currentCharacter.created}</p>
                                    <p>{store.currentCharacter.edited}</p>
                                    <p>Homeworld: {store.currentCharacter.homeworld}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}