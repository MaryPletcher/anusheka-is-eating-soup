import React, { useState } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
import { getDatabase, ref, push, set } from "firebase/database"; // for saving data (message + image URL)
import { storage, database } from "../firebase";


function Home() {
    //define use states
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    //handle for uploading a file and show a preview 
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // show preview
        }
    };


    //write to the database!
    function writeUserData(text, photo, dropID) {
        //get reference to database
        const db = getDatabase();
        //
        set(ref(db, 'drops/' + dropID), {
            text: text,
            photoURL: photo,
            timeStamp: Date.now()
        });
        alert("successfully sent to the database!")
    }

    const handleSubmit = async () => {
        //an error if the message and imageFile isnt uploaded 
        if (!message && !imageFile) {
            alert("Add a message or an image before submitting!");
            return;
        }
        //
        writeUserData(message, "TESTphoto.url", "000")
    }

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
        </div>
    );
}

export default Home;
