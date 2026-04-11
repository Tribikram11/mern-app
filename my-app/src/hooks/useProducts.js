import { useState, useEffect } from "react";


const useProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});


    // fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("http://localhost:5000/api/products");
            if (!res.ok) throw new Error("request failed");
            const data = await res.json();
            setProducts(data.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchProducts();
    }, [])

    //add products
    const addProducts = async (formData) => {
        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Failed to add product')
            }
            const data = await res.json();
            setProducts((prev) => [...prev, data.data])

        } catch (error) {
            alert(error.message)
        }
    }

    // delete products
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Delete failed');
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    // edit start
    const handleStart = (product) => {
        setEditingId(product._id)
        setEditData({
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock
        })
    }

    // edit change
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }))
    }

    // edit cancel
    const handleEditCancel = () => {
        setEditingId(null);
        setEditData({})
    }

    // update
    const updateProduct = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.message || "update failed")
            }

            const data = await res.json();

            setProducts(prev => prev.map(p => p._id === id ? data.data : p))

            setEditingId(null);
            setEditData({})
        } catch (err) {
            alert(err.message)
        }
    }

    return {
        products,loading,error,
        editingId,editData,addProducts,
        handleDelete,handleStart,handleEditChange,
        handleEditCancel,updateProduct
    }

}

export default useProducts;