import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (
        <div className="container">
            <h1 className="text-center">Contact List</h1>
            <div className="d-flex justify-content-end">
                <Link to='/add-contact'>
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>

            <div>
                {store.contacts.map((item) => (
                    <div key={item.id} className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://randomuser.me/api/portraits/women/26.jpg" className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.email}</p>
                                    <p className="card-text">{item.phone}</p>
                                    <p className="card-text">{item.address}</p>
                                    <div className="d-flex justify-content-between">
                                       <Link to={'/edit-contact/'+item.id}> <span>
                                            <i className="fas fa-pencil-alt text-success mx-1"></i>
                                        </span> </Link>
                                        <span onClick={() => handleDelete(item.id)} >
                                            <i className="far fa-trash-alt text-danger mx-1"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
