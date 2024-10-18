import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Home } from "./pages/Home.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { DataRow } from "./component/DataRow.jsx";
import { DetailCharacters } from "./pages/DetailCharacters.jsx";
import { DetailPlanet } from "./pages/DetailPlanet.jsx";
import { DetailStarShip } from "./pages/DetailStarShip.jsx";


// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                     <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<AddContact />} path="/add-contact" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<EditContact />} path="/edit-contact/:theid" />
                        <Route element={<DataRow category="characters"/>} path="/characters" />
                        <Route element={<DataRow category="planets"/>} path="/planets" />
                        <Route element={<DataRow category="starships"/>} path="/starships" />
                        <Route element={<DetailCharacters/>} path="/characters/:uid" />
                        <Route element={<DetailPlanet/>} path="/planets/:uid" />
                        <Route element={<DetailStarShip/>} path="/starships/:uid" />
                        <Route element={<h1>Not found!</h1>} path="*" />  
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
