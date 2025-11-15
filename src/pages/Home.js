import React, { useState, useEffect } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
import { getDatabase, ref, push, set, onValue } from "firebase/database"; // for saving data (message + image URL)
import { storage, database } from "../firebase";

//________ soup drops list component 
function ListDrops({dropData}) {
    const [url, setUrl] = useState(null);
    if (!dropData) return <p>soup incoming...</p>;

    //console.log("dropData=", dropData);
    //console.log("dropDataAAAa:" , dropData?.["1762206817660"]?.text);

    const dropsList = Object.entries(dropData).map(([i, element]) => (
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

    return (
        <li>{i}
            <p>{element.text}</p>
            <p>{element.photoURL}</p>
            {durl ? <img src = {durl}></img> : <p>loading pretty soup pic...</p>}
        </li>
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

    //handle clicking submit 
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

        //Reset form
        setMessage("");
        setImageFile(null);
        setPreviewUrl(null);
    }
    //end of handling submit 

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

    //lets look at this later 
    // //handle for submitting 
    // const handleSubmit = async () => {
    //     if (!message && !imageFile) {
    //     alert("Add a message or an image before submitting!");
    //     return;
    //     }

    //     setSubmitting(true);
    //     try {
    //     let imageUrl = "";

    //     // Upload image if present
    //     if (imageFile) {
    //         const storageReference = storageRef(storage, `drops/${Date.now()}_${imageFile.name}`);
    //         await uploadBytes(storageReference, imageFile);
    //         imageUrl = await getDownloadURL(storageReference);
    //     }

    //     // Save drop to Realtime Database
    //     const newDropRef = push(ref(database, "drops"));
    //     await set(newDropRef, {
    //         message,
    //         imageUrl,
    //         timestamp: Date.now(),
    //     });

    //     const dropId = newDropRef.key;
    //     alert(`Drop created! Share this link: https://yourapp.web.app/drops/${dropId}`);

    //     // Reset form
    //     setMessage("");
    //     setImageFile(null);
    //     setPreviewUrl(null);
    //     } catch (err) {
    //     console.error("Error creating drop:", err);
    //     alert("Error creating drop. Check console.");
    //     }

    //     setSubmitting(false);
    // };

    //where all the stuff you see is 
    return (
        <div>
            <p>this is a test</p>
            <textarea
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
            </button>

            <div>
                <p>example</p>
                <ListDrops
                    dropData = {dropData}
                    db = {db}
                />
            </div>    

        </div>
    );
}

export default Home;
