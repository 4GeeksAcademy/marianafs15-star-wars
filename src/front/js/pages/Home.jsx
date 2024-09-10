import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { DataRow } from "../component/DataRow.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <h1 className="text-center">Home</h1>

            <DataRow category="characters"/> 
            <DataRow category="planets"/> 
        </div>


    )
}
