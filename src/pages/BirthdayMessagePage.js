import React, { useState, useEffect } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
import { getDatabase, ref, push, set, onValue } from "firebase/database"; // for saving data (message + image URL)
import { storage, database } from "../firebase";
import ControlPanel from "../components/ControlPanel.js";
import Home from "../pages/Home.js";
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import Container from "../components/ui/Container";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import origins from "../media/origin.png";

function BirthdayMessagePage() {
    return (
    <div>
        <Nav>
            {/* <Link to = "/">soup history</Link>
            <a> | </a>
            <Link to = "/ControlPanelPage">soup control panel</Link>
            <a> | </a>
            <Link to = "/BirthdayMessagePage">happy birthday!</Link> */}
        </Nav>
        <Container>
        <Container>
            <Title>Happy Birthday ANUSHEKA!!</Title>
            <p>Hi Anusheka!!! Happy birthday!! I made this for you to share your soup joy with all your friends &lt;3 because we love you and hearing about your soup. </p>
            <p>So, next time you have some soup please take a pic or just type up your thoughts and click SOUP! </p>
            <p>You eat soup → you submit a soup → we all can look at it!</p>
            <br></br>
            <p>Ready to get started?</p>
            <Link to = "/ControlPanelPage">
                <Button
                    variant = "primary"
                    >
                        soup soup soup soup
                </Button>
            </Link>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>ps idk if you remember when this idea was created but i totally stole it from you so i hope you're not actually working on this project HEHE</p>
            <img src = {origins}></img> 
            <p>&lt;3 mary</p>
        </Container>
        </Container>
    </div>

    );
}

export default BirthdayMessagePage;