import { useState } from "react"

const ProductForm = ({onAdd}) => {
    const [formData, setFormData] = useState({
        name:'',
        price:'',
        category:'electronics',
        stock:''
    })
    
    const [error, setError] = useState({});
    // const [submittedData, setSubmittedData] = useState(null);

    const handleChange =(e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:value
        }))
    };

    const validate = () => {
        const newErrors = {};

        if(!formData.name.trim()){
            newErrors.name = "name can not be empty"
        }

        if(!formData.price || Number(formData.price) <= 0){
            newErrors.price = "price should be greater than zero"
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();

        if(!isValid) return;

        await onAdd(formData);
        setFormData({
            name:'',
            price:'',
            category:'electronics',
            stock:''
        })

        setError({})
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Product name"
                />
                {error.name && <p>{error.name}</p>}
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price"
                />
                {error.price && <p>{error.price}</p>}
                <input name="stock" value={formData.stock} onChange={handleChange} placeholder="stock" 
                />

                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="electronics">electronics</option>     
                    <option value="clothing">clothing</option>
                    <option value="food">food</option>
                </select> 
                <button type="submit">Add Product</button>
            </form>

        </>
    )

}

export default ProductForm;
