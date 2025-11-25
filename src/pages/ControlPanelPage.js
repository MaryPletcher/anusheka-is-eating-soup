import React, { useState, useEffect } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
import { getDatabase, ref, push, set, onValue } from "firebase/database"; // for saving data (message + image URL)
import { storage, database } from "../firebase";
import ControlPanel from "../components/ControlPanel.js";
import Home from "../pages/Home.js";
import { Link } from 'react-router-dom';

function ControlPanelPage() {
    return (
    <div>
        {/* <Link to = "/">Home</Link> */}
        <ControlPanel/>
    </div>
    );
}

export default ControlPanelPage;