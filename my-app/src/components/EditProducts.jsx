const EditProducts = ({id,editData, onEditChange,onEditCancel,onUpdate}) => {
    
        return (
            <div>
                <input
                    name="name"
                    value={editData.name}
                    onChange={onEditChange}
                />
                <input
                    name="price"
                    type="number"
                    value={editData.price}
                    onChange={onEditChange}
                />
                <input
                    name="stock"
                    type="number"
                    value={editData.stock}
                    onChange={onEditChange}
                />
                <select
                    name="category"
                    value={editData.category}
                    onChange={onEditChange}
                >
                    <option value="electronics">electronics</option>
                    <option value="clothing">clothing</option>
                    <option value="food">food</option>
                </select>
                <button onClick={() => onUpdate(id)}>save</button>
                <button onClick={onEditCancel}>cancel</button>
            </div>
        )
    
}

export default EditProducts;