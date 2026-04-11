import ProductCard from "./ProductCard";
import ProductForm from "./ProductFrom";
import useProducts from "../hooks/useProducts";

const ProductList = () => {
    const {products,loading,error,
        editingId,editData,addProducts,
        handleDelete,handleStart,handleEditChange,
        handleEditCancel,updateProduct} = useProducts();
    
        if(loading) return <p>Loading...</p>
        if(error) return <p>Error: {error}</p>

    return (
        <>
            <h1>products</h1>
            <ProductForm onAdd={addProducts} />
            {products.length === 0
                ?
                <p>no products found</p>
                : products.map(p => 
                <ProductCard
                    key={p._id}
                    product={p}
                    onDelete={handleDelete}
                    onUpdate={updateProduct}
                    editingId={editingId}
                    editData={editData}
                    onEditStart={handleStart}
                    onEditChange={handleEditChange}
                    onEditCancel={handleEditCancel}
                />
                )
            }
        </>)
}

export default ProductList;
