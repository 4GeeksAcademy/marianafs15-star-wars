import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const DataRow = ({ category }) => {
  const { store, actions } = useContext(Context);
  const backupSource =
    "https://starwars-visualguide.com/assets/img/placeholder.jpg";

  const handleError = (event) => {
    event.target.src = backupSource;
  };
  const handleFavorite = (element) => {
   const newFavorite = {
    name : element.name,
    type: 'character'
   }
   actions.addFavorites(newFavorite);
  }

  return (
    <div className="container my-3 bg-dark">
      <h1 className="text-center text-light">
        {" "}
        {category == "characters"
          ? "Characters"
          : category == "planets"
          ? "Planets"
          : "Starships"}
      </h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {store[category].map((item) => (
          <div key={item.uid} className="col">
            <div className="card border-dark my-3 mx-2 text-bg-dark">
              <img
                src={`https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`}
                className="card-img-top"
                alt="..."
                onError={handleError}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between">
                  <Link to={`/${category}/${item.uid}`} className="btn btn-dark">
                    Detalles
                  </Link>
                  <span onClick={() => handleFavorite(item)}>

                  <i className="fas fa-heart fa-2x text-danger"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};