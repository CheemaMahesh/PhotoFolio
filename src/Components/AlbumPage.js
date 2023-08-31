export default function(){


    
    return(<>
    
    {/* </div> */}
        <div className="I-Body">
        <input placeholder=" Title" ref={titleRef} required/>
        <input placeholder=" Image URL"  required />
            <button className="clear" onClick={handleClear}>Clear</button>
            <button className="create" onClick={handleAdd}>Create</button>
        </div>


    </>)

}