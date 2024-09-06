import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        let success = await actions.deleteContact(id)
        if (!success) {
            alert("An error ocurred while attempting to delete this contact. Please try again later.")
        }
    }
    const  getRandomProfilePic=()=>{
        const gender = Math.random() < 0.5 ? 'men' : 'women';
        const id = Math.floor(Math.random() * 100);
        return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
      }

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
                    <div key={item.id} className="card mb-3 mx-auto" style={{ width: "50rem" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                            <img src={getRandomProfilePic()} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.email}</p>
                                    <p className="card-text">{item.phone}</p>
                                    <p className="card-text">{item.address}</p>

                                </div>
                            </div>
                            <div className="col-md-2 d-flex">
                                <Link to={'/edit-contact/' + item.id}> <span>
                                    <i className="fas fa-pencil-alt text-success mx-1"></i>
                                </span> </Link>
                                <span className="ms-2" onClick={() => handleDelete(item.id)} >
                                    <i className="far fa-trash-alt text-danger mx-1"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};