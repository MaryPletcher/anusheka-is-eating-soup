import React, { useState, useEffect } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
import { getDatabase, ref, push, set, onValue } from "firebase/database"; // for saving data (message + image URL)
import { storage, database } from "../firebase";
import ControlPanel from "../components/ControlPanel.js";
import Home from "../pages/Home.js";
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";

function ControlPanelPage() {
    return (
    <div>
        <Nav>
            <Link to = "/">soup history</Link>
            <a> | </a>
            <Link to = "/ControlPanelPage">soup control panel</Link>
            {/* <a> | </a> */}
        </Nav>
        <ControlPanel/>
    </div>
    );
}

export default ControlPanelPage;