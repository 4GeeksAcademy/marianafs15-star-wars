import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const BtnFavorites = () => {
  const { store, actions } = useContext(Context);

  const handleTrash = (item) => {
    actions.removeFavorites(item.name)
  }

  return (
    <div className="dropdown">
      <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Favorites
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
          {store.favorites.length}
          <span className="visually-hidden">unread messages</span>
        </span>
      </button>
      <ul className="dropdown-menu">
        {store.favorites.map((item, index) =>
          <li key={index} className="dropdown-item d-flex justify-content-between">
            {item.name} - {item.type}
            <span onClick={() => handleTrash(item)} className="ms-5">
              <i className="fas fa-trash text-danger"></i>
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}