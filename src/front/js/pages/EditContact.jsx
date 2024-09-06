import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const EditContact = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [contact, setContact] = useState(null)
	const [invalidItems, setInvalidItems] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		setContact(store.contacts.find(item => item.id == params.theid))
	}, [])


	const validateFields = () => {
		const phoneRegex = /^[0-9]{10}$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		let errors = [];

		if (contact.name.trim() === "") {
			errors.push("name");
		}
		if (contact.phone.trim() === "" || !phoneRegex.test(contact.phone)) {
			errors.push("phone");
		}
		if (contact.email.trim() === "" || !emailRegex.test(contact.email)) {
			errors.push("email");
		}
		if (contact.address.trim() === "") {
			errors.push("address");
		}

		setInvalidItems(errors);

		return errors.length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateFields()) {

			let success = await actions.editContact(contact);
			if (success) {
				setInvalidItems([]);
				navigate("/contact");
			}
		}
	};
	return (
		<div className="container pt-5">
			<button onClick={() => console.log(store)}>click here</button>
			<form onSubmit={handleSubmit}>
				<h1 className="text-center">Edit contact</h1>
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput" className="form-label">
						Full Name
					</label>
					<input
						type="text"
						className="form-control"
						id="formGroupExampleInput"
						placeholder="John Doe/Jane Doe"
						value={contact?.name}
						onChange={(e) => setContact({ ...contact, name: e.target.value })}
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
						value={contact?.phone}
						onChange={(e) => setContact({ ...contact, phone: e.target.value })}
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
						value={contact?.email}
						onChange={(e) => setContact({ ...contact, email: e.target.value })}
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
						value={contact?.address}
						onChange={(e) => setContact({ ...contact, address: e.target.value })}
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