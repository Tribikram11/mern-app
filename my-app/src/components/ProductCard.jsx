import EditProducts from "./EditProducts";

const ProductCard = ({ product, onDelete, onUpdate, editingId, editData, onEditStart, onEditChange, onEditCancel }) => {
    const { _id, name, price, category, stock } = product;

    if (editingId === _id) {
        return (
            <EditProducts
                id={_id}
                editData={editData}
                onEditChange={onEditChange}
                onUpdate={onUpdate}
                onEditCancel={onEditCancel}
            />
        )
    }

    return (
        <div>
            <h3>name: {name}</h3>
            <p>price: ${price}</p>
            <p>category:{category}</p>
            <p>stock:{stock} in stock</p>
            <button onClick={() => onEditStart(product)}>Edit</button>
            <button onClick={() => onDelete(_id)}>delete</button>
        </div>
    )
}

export default ProductCard;