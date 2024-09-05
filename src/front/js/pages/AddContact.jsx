import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [invalidItems, setInvalidItems] = useState([]);
  const navigate = useNavigate();

  const validateFields = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errors = [];

    if (name.trim() === "") {
      errors.push("name");
    }
    if (phone.trim() === "" || !phoneRegex.test(phone)) {
      errors.push("phone");
    }
    if (email.trim() === "" || !emailRegex.test(email)) {
      errors.push("email");
    }
    if (address.trim() === "") {
      errors.push("address");
    }

    setInvalidItems(errors);

    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      let newContact = {
        name: name,
        phone: phone,
        email: email,
        address: address,
      };

      let success = await actions.addContact(newContact);
      if (success) {
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setInvalidItems([]);
      }
    }
    actions.addContact(dataToSend);
    navigate("/contacts");
  };


  return (
    <div className="container pt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Add a new contact</h1>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="John Doe/Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {invalidItems.includes("name") && (
            <p className="alert alert-danger">Please provide a valid name</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Enter Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="000-000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {invalidItems.includes("phone") && (
            <p className="alert alert-danger">
              Please provide a valid phone number
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Enter Email
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="xxxx@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {invalidItems.includes("email") && (
            <p className="alert alert-danger">Please provide a valid email</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Enter Address
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {invalidItems.includes("address") && (
            <p className="alert alert-danger">Please provide a valid address</p>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <Link to="/" className="btn btn-secondary">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};
