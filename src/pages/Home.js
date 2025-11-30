import React, { useState, useEffect } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
import { getDatabase, ref, push, set, onValue } from "firebase/database"; // for saving data (message + image URL)
import { storage, database } from "../firebase";
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import Container from "../components/ui/Container";
import Title from "../components/ui/Title";
import styles from '../styles/Home.module.css';

//________ soup drops list component 
function ListDrops({dropData}) {
    const [url, setUrl] = useState(null);
    if (!dropData) return <p>soup incoming...</p>;

    //console.log("dropData=", dropData);
    //console.log("dropDataAAAa:" , dropData?.["1762206817660"]?.text);

    const dropsList = Object.entries(dropData).toReversed().map(([i, element]) => (
        <SoupDrop 
            key = {i}
            i = {i}
            element = {element}
        ></SoupDrop>
    ));
    return <div>{dropsList}</div>;
    }
//________ end soup drops list component 

//________ individual soup drop component
function SoupDrop({i, element}) {
    const [durl, setdUrl] = useState(null);

    useEffect(() => {
        if (!element.photoURL) return;
        const imgRef = storageRef(storage, element.photoURL);

        getDownloadURL(imgRef)
            .then((downloadUrl) => setdUrl(downloadUrl))
            .catch((err) =>console.error(err))
    }, [element.photoURL]);

    var date = new Date(element.timeStamp)
    var postedDate = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear()
    return (
        <Container>
            <p>{postedDate}</p>
            {/* <p>{element.photoURL}</p> */}
            {durl ? <img src = {durl}></img> : <p>loading pretty soup pic...</p>}
            <p>{element.text}</p>
        </Container>
    )
}
//________ end individual soup drop component

function Home() {
    //define use states
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dropData, setDropData] = useState(null);
    // const [submitting, setSubmitting] = useState(false);

    //define variables 
    

    //handle for uploading a file and show a preview 
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // show preview
        }
    };

    //get reference to database
    const db = getDatabase();

    //write to the database!
    function writeUserData(text, photo) {
        //write to the database 
        set(ref(db, 'drops/' + Date.now()), {
            text: text,
            photoURL: photo,
            timeStamp: Date.now()
        });
        alert("successfully sent to the database!")
    }

    //_____handle clicking submit 
    const handleSubmit = async () => {
        //an error if the message and imageFile isnt uploaded 
        console.log("message:" + message);
        console.log("imageFile:" + imageFile);
        console.log("imageFile.name:" + imageFile.name);
        if (!message && (imageFile == null)) {
            alert("Add a message or an image before submitting!");
            return;
        }

        //upload tha picture
        let imagePath ="";
        let imageUrl = "";
        //Upload image if present to cloud storage (yikes i hope i dont get charged)
        if (imageFile) {
            imagePath = `soupPics/${Date.now()}_${imageFile.name}`
            const storageReference = storageRef(storage, `${imagePath}`);

            // make sure upload is complee 
            await uploadBytes(storageReference, imageFile);
            // uploadBytes(storageReference, imageFile).then((snapshot) => {
            //     console.log('Uploaded an image file!');
            // });
            imageUrl = await getDownloadURL(storageReference);
        }


        //write to the database
        writeUserData(message, imageUrl)
        //HERE IS WHERE A TEXT WOULD BE SENT 
        //Reset form
        setMessage("");
        setImageFile(null);
        setPreviewUrl(null);
    }
    //______end of handling submit 

    //_____get the drops

    //get the data using use effect
    useEffect (() => {
        //reference to firebase 
        const dropsRef = ref(db, 'drops/');

        const unsubscribe = onValue(dropsRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(data);
            setDropData(data);
        });
        return () => unsubscribe();
    }, []);
    console.log(dropData);
    //______end get the drops

    

    //where all the stuff you see is 
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
            <Title>Anusheka's Soup History</Title>
            {/* <p>this is a test</p> */}
            {/* <Link to = "/ControlPanelPage">ControlPanelPage</Link> */}
            {/* <textarea
                type ="text"
                placeholder = "your message to your soup fans"
                value = {message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            {previewUrl && (
                <div style={{ marginBottom: "1rem" }}>
                <p>Preview:</p>
                <img
                    src={previewUrl}
                    alt="preview"
                    style={{ maxWidth: "100%", borderRadius: "10px" }}
                />
                </div>
            )}

            <button
                onClick={handleSubmit}
            >
                Submit
            </button> */}

            <div>
                {/* <p>example</p> */}
                <ListDrops
                    dropData = {dropData}
                    db = {db}
                />
            </div>    
            </Container>
        </div>
    );
}

export default Home;
