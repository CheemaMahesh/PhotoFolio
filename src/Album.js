import {useState,useEffect,useRef} from "react";
import {db} from "./FirebaseInit";
import { collection,doc,setDoc,onSnapshot ,deleteDoc} from "firebase/firestore";

export default function Album(){
    // const [AlbumN,setAlbum]=useState();
    const [AlbumN, setAlbum] = useState(""); // Initialize with undefined

    const [Albums,setAlbums]=useState([]);
    const [btnD,setBtnd]=useState(false);
    const [formD,setFormd]=useState(false);
    const [addForm,setAddform]=useState(true);
    const [pageTitle,setPageTitle]=useState(null);
    const titleRef = useRef(null);
    //  let clAddBtn="";
    const [clAddBtn,setCladd]=useState("addButton");

    // ================single page variales=======================
    const [dImage,setDimage]=useState({name:"", url:""});
    const [images,setImages]=useState([]);
    

    
    useEffect(() => {
        if (btnD||!addForm) {
          titleRef.current.focus();
        }
      }, []);

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

            // ==============handlePages
            function handlePage(i){
                console.log("handlePage",i);
                setPageTitle(i);
                setFormd(true);
                console.log(pageTitle);
            }
            function handlePageT(){
                setFormd(false);
                
            }
            
            

            function getAlbumTitle() {
                const selectedAlbum = Albums.find((album) => album.id === pageTitle);
                // console.log(selectedAlbum);
                return selectedAlbum ? selectedAlbum.title : ""; // Get the title
            }

            function handleAddImage(){
                const mahi=!addForm;
                setAddform(mahi);
                if(addForm){
                    setCladd("cancleButton");
                    console.log("cancleButton",addForm)

                }else{
                    
                    setCladd("addButton");
                    console.log("addButton",addForm)
                }
            }

            function handlePageClear(){
                setDimage({name:"", url:""});
                console.log("handlePageClear");
                 titleRef.current.focus();
            }

            

    
            return(<>{formD?( <div className="Album-Top-page">
               {addForm?null:<div className="addUrl">
               <div className="I-Bodys">
        <input
    placeholder=" Title"
    ref={titleRef}
    required
    value={dImage.name}  
    onChange={(e) => setDimage({ ...dImage, name: e.target.value })}  
/>
<input
    placeholder=" Image URL"
    required
    value={dImage.url}  
    onChange={(e) => setDimage({ ...dImage, url: e.target.value })}  
/>

           <div className="buttonsDiv"> <button className="clear" onClick={handlePageClear}>Clear</button>
            <button className="create" onClick={handleAdd}>Create</button></div>
        </div>
                </div>}
            <div className="pageHeading">
                    <div className="goBack" onClick={handlePageT}><img src="https://cdn.pixabay.com/photo/2012/04/24/23/42/undo-41179_1280.png" alt="got-back"/></div>
                    <div className="pageTitle"><h1>Images in {getAlbumTitle()}</h1></div>
                    <div className="Add-ImageASearch">
                            
                            <div className="add-img" ><button className={clAddBtn} onClick={handleAddImage}>{addForm?"Add image":"Cancle"}</button></div>
                    </div>  
            </div>
            <div className="pageBody">

            </div>
        
        </div>):(<div className="Album">

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
            .map((data) => (
                <div key={data.id} className="data-div" onClick={(e)=>{handlePage(data.id)}}>
                    <img src="https://img.icons8.com/?size=512&id=97658&format=png" alt="album-i"/>
                    <h1>{data.title}</h1>
                    {/* <button className="cancleButton" value={data.id} onClick={(e) => { deleteAlbum(data.id) }}>Delete</button> */}
                </div>
            ))}</div>
        </div>)}</>)
}

