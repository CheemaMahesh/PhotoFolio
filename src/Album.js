import {useState,useEffect,useRef} from "react";
import {db} from "./FirebaseInit";
import { collection,doc,setDoc } from "firebase/firestore";

export default function Album(){
    // const [AlbumN,setAlbum]=useState();
    const [AlbumN, setAlbum] = useState(""); // Initialize with undefined

    const [Albums,setAlbums]=useState([]);
    const [btnD,setBtnd]=useState(false);
    const [formD,setFormd]=useState(false);

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
                    setAlbum(""); // Reset the input field
                } catch (error) {
                    console.error("Error adding album:", error);
                }
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
        <div className="Album-Display">{Albums.map((data,i)=>{
            return(<h1 key={i}>{data}</h1>)
        })}</div>
    </div>)
}