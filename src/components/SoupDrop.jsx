// import Container from "./ui/Container";
// import Title from "./ui/Title";
// import React, { useState, useEffect } from "react";
// import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // for uploading images
// function SoupDrop({i, element}) {
//     const [durl, setdUrl] = useState(null);

//     useEffect(() => {
//         if (!element.photoURL) return;
//         const imgRef = storageRef(storage, element.photoURL);

//         getDownloadURL(imgRef)
//             .then((downloadUrl) => setdUrl(downloadUrl))
//             .catch((err) =>console.error(err))
//     }, [element.photoURL]);

//     return (
//         <Container>
//             <Title>{element.text}</Title>
//                 {/* <p>{element.photoURL}</p> */}
//             {durl ? <img src = {durl}></img> : <p>loading pretty soup pic...</p>}
//         </Container>
//     )
// }