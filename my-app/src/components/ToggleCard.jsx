import { useState } from "react"

 const Togglecard = () => {
    const [showDetails, setShowDetails] = useState(false)

    const obj = {
        name:'laptop',
        price:'322',
        category:'electronics'
    }

    return(
        <>
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>
            {showDetails ? <div>
                <p>Name: {obj.name}</p>
                <p>Price: ${obj.price}</p>
                <p>Category: {obj.category}</p>
            </div> : <div></div>}
        </>
    )
 }

 export default Togglecard