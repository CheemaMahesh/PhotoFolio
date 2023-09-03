import {useState,useEffect,useRef} from "react";
import {db} from "./FirebaseInit";
import { collection,doc,setDoc,onSnapshot ,deleteDoc} from "firebase/firestore";

export default function Album(){
  
    const [AlbumN, setAlbum] = useState(""); 

    const [Albums,setAlbums]=useState([]);
    const [btnD,setBtnd]=useState(false);
    const [formD,setFormd]=useState(false);
    const [addForm,setAddform]=useState(true);
    const [pageTitle,setPageTitle]=useState(null);
    const titleRef = useRef(null);
    
    const [clAddBtn,setCladd]=useState("addButton");
    // ================single page variales=======================
    const [dImage,setDimage]=useState({name:"", url:""});
    const [images,setImages]=useState([]);
    const pageTitleRef = useRef(null);

    

   //========================For focus 
    useEffect(() => {
        if (btnD||!addForm) {
          titleRef.current.focus();
        }
      }, []);

    
// ==================To show the Form
            const handleAlbum=(e)=>{
                e.preventDefault();

                setBtnd(true);
            }
 // =============to hide Album
            const handleCAlbum=(e)=>{
                e.preventDefault();
                setBtnd(false);
            }
// ==============To  clear the input fields
            const handleClear=(e)=>{
                e.preventDefault();
                titleRef.current.focus();
                setAlbum("");
            }
// =============To add an Album to the list
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


// ================To Collect real-time data
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


// To Delete an Album (but have not used so far)
            async function deleteAlbum(i){
                const docRef=doc(db,"photofolio",i);
                deleteDoc(docRef);
                
            }

 // ==============handlePages- to show the particular page
            function handlePage(i){
              

                
                    pageTitleRef.current = i;
                    setPageTitle(i);
                    setFormd(true);
                  
            }

            function handlePageT(){
                setFormd(false);
                
            }
            
            

            function getAlbumTitle() {
                const selectedAlbum = Albums.find((album) => album.id === pageTitle);
                // console.log(selectedAlbum);
                return selectedAlbum ? selectedAlbum.title : ""; // Get the title
            }
            

// ==================To show the Form to add url
            function handleAddImage(){
                const mahi=!addForm;
                setAddform(mahi);
                if(addForm){
                    setCladd("cancleButton");

                }else{
                    
                    setCladd("addButton");
                }
            }

// =========== To clear the input fields
            function handlePageClear(){
                setDimage({name:"", url:""});
                 titleRef.current.focus();
            }


 // =================Add images to the Database
           async  function handlePageAdd(){
               
                //  ===============================

                try {
                    const docRef = doc(collection(db, `photofolio/${pageTitle}/photofolioc`));
            
                  const mahi=  await setDoc(docRef, {
                        name: dImage.name,
                        url:dImage.url,
                        createdOn: new Date()
                    });
                    setImages([...images,dImage]);
                    console.log(images[0]);
                     setDimage({name:"", url:""});
                     titleRef.current.focus();
    
                } catch (error) {
                    console.error("Error adding album-Images:", error);
                }
            }

            // =======================Rendering images of Album
            let rr=getAlbumTitle;

// =====================To collect data from Database of images of a perticular Album
            useEffect(() => {
                
                onSnapshot( collection(db, `photofolio/${pageTitleRef.current}/photofolic`),
                  (snapShot) => {
                    const ims = snapShot.docs.map((doc) => ({
                      id: doc.id,
                      ...doc.data(),
                    }));
                    setImages(ims); // Set images directly without merging
                  }
                );
              
               
              }, [pageTitle]); // Include pageTitle as a dependency
            

            

    
            return(<>{formD?( 
// ====================================================UI to show the Page of an Album========================================================
            <div className="Album-Top-page">
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
            <button className="create"  onClick={handlePageAdd}>Create</button></div>
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

           
    {images.map((data, i) => (
        <div key={i}>
            <img
                src={data.url}
                alt={data.name}
                onError={(e) => {
                    console.error("Error loading image:", {e});
                }}
                
            />
        </div>
    ))}


           

</div>

        
        </div>):(
//  ================================================================UI To show the Home page====================================================================
        <div className="Album">

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
    .filter((data) => data.title) // Filter out items without a title
    .sort((a, b) => (a.title || '').localeCompare(b.title || '')) // Sort albums alphabetically
    .map((data) => (
        <div key={data.id} className="data-div" onClick={(e)=>{handlePage(data.id)}}>
            <img src="https://img.icons8.com/?size=512&id=97658&format=png" alt="album-i"/>
            <h1>{data.title}</h1>
        </div>
    ))}
</div>

        </div>)}</>)
}

