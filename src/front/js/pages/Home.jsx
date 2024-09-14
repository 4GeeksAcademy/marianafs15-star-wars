import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);


   /* useEffect(() => {
        // voy a ejecutar la funcion que trae los contactos
        actions.getContact();
    }, []) */

    return (
        <div className="container">
            <h1 className="text-center">Home</h1>
        </div>


    )
}
