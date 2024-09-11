import React from "react";


export const BtnFavorites = () => {

  return (
    <div className="dropdown">
      <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Favorites
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          99+
          <span className="visually-hidden">unread messages</span>
        </span>
      </button>
      <ul className="dropdown-menu">
        <li className="dropdown-item d-flex justify-content-between">
          Action
          <span>

            <i className="fas fa-trash text-danger"></i>
          </span>
        </li>
      </ul>
    </div>
  )
}