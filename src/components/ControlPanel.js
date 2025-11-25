import React, { useState, useEffect } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
import { getDatabase, ref, push, set, onValue } from "firebase/database"; // for saving data (message + image URL)
import { storage, database } from "../firebase";
import styles from "../styles/controlPanel.module.css";

function ControlPanel() {
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
        
        //where all the stuff you see goes 
        return(
            <div className = {styles.tileContainer}>
                <h2>Anusheka's Soup Control Panel</h2>
                <textarea
                    type ="text"
                    placeholder = "write a message describing your soup or just say hi!"
                    value = {message}
                    onChange={(e) => setMessage(e.target.value)}
                    className = {styles.message}
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
                    SOUP!!!
                </button>
            </div>
        );

}

export default ControlPanel;