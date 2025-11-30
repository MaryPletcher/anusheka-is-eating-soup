// function ListDrops({dropData}) {
//     const [url, setUrl] = useState(null);
//     if (!dropData) return <p>soup incoming...</p>;

//     //console.log("dropData=", dropData);
//     //console.log("dropDataAAAa:" , dropData?.["1762206817660"]?.text);

//     const dropsList = Object.entries(dropData).map(([i, element]) => (
//         <SoupDrop 
//             key = {i}
//             i = {i}
//             element = {element}
//         ></SoupDrop>
//     ));
//     return <div>{dropsList}</div>;
//     }