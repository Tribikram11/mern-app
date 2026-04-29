
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';

const useProducts = () => {
    const { accessToken } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiRequest('/products');
            setProducts(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (formData) => {
        try {
            const data = await apiRequest(
                '/products',
                { method: 'POST', body: JSON.stringify(formData) },
                accessToken  // pass token
            );
            setProducts(prev => [...prev, data.data]);
        } catch (err) {
            alert(err.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await apiRequest(
                `/products/${id}`,
                { method: 'DELETE' },
                accessToken
            );
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    const startEdit = (product) => {
        setEditingId(product._id);
        setEditData({
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({});
    };

    const updateProduct = async (id) => {
        try {
            const data = await apiRequest(
                `/products/${id}`,
                { method: 'PUT', body: JSON.stringify(editData) },
                accessToken
            );
            setProducts(prev =>
                prev.map(p => p._id === id ? data.data : p)
            );
            setEditingId(null);
            setEditData({});
        } catch (err) {
            alert(err.message);
        }
    };

    return {
        products, loading, error,
        editingId, editData,
        addProduct, deleteProduct,
        startEdit, handleEditChange,
        cancelEdit, updateProduct
    };
};

export default useProducts;