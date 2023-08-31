import {useState,useEffect,useRef} from "react";
import {db} from "./FirebaseInit";
import { collection,doc,setDoc,onSnapshot ,deleteDoc} from "firebase/firestore";

export default function Album(){
    // const [AlbumN,setAlbum]=useState();
    const [AlbumN, setAlbum] = useState(""); // Initialize with undefined

    const [Albums,setAlbums]=useState([]);
    const [btnD,setBtnd]=useState(false);
    // const [formD,setFormd]=useState(false);

    const titleRef = useRef(null);

    
    useEffect(() => {
        if (btnD) {
          titleRef.current.focus();
        }
      }, [btnD]);

            const handleAlbum=(e)=>{
                e.preventDefault();
                console.log("handleAlbum");
                setBtnd(true);
            }
            const handleCAlbum=(e)=>{
                e.preventDefault();
                setBtnd(false);
            }
            const handleClear=(e)=>{
                e.preventDefault();
                titleRef.current.focus();
                setAlbum("");
            }
            async function handleAdd(e) {
                e.preventDefault();
                try {
                    const docRef = doc(collection(db, "photofolio"));
            
                  const mahi=  await setDoc(docRef, {
                        title: AlbumN,
                        createdOn: new Date()
                    });
                    console.log(mahi);
            
                    setAlbums([...Albums, AlbumN]);
                    titleRef.current.focus();
                    setAlbum(""); // Reset the input field
                } catch (error) {
                    console.error("Error adding album:", error);
                }
            }

            useEffect(()=>{
                onSnapshot(collection(db,"photofolio"),(snapShot)=>{
                    const blogs = snapShot.docs.map((doc) => {
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                })
                // console.log(blogs);
                setAlbums(blogs);
            });
            },[Albums]);

            async function deleteAlbum(i){
                const docRef=doc(db,"photofolio",i);
                deleteDoc(docRef);
                
            }
            

    
    return(<div className="Album">

        <div className="AddDiv">
        {btnD?<div className="albumAddForm">
            
        <div className="I-heading">
        <h1>Create an album</h1>
    </div>
    <div className="I-Body">
<input placeholder="Album Name" ref={titleRef} value={AlbumN} onChange={(e)=>setAlbum(e.target.value)} required/>
        <button className="clear" onClick={handleClear}>Clear</button>
        <button className="create" onClick={handleAdd}>Create</button>
    </div>


        </div>:null}
<div className="form"><h1>Your Albums</h1>
                {btnD ? (
          <button className="cancleButton" onClick={handleCAlbum}>Cancle</button>
        ) : (
          <button className="addButton" onClick={handleAlbum}>Add Album</button>
        )}       </div>
                     
        </div>
        <div className="Album-Display">{Albums
        .sort((a, b) => a.title.localeCompare(b.title)) // Sort albums alphabetically
        .map((data, i) => (
            <div key={data.id} className="data-div">
                <h1>{data.title}</h1>
                <button className="cancleButton" value={data.id} onClick={(e) => { deleteAlbum(data.id) }}>Delete</button>
            </div>
        ))}</div>
    </div>)
}