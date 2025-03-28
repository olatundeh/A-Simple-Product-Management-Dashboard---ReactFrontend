import React from 'react'

export default function ProductForm({ id, productName, setName, productCode, setProductCode, price, setPrice, quantity, setQuantity, category, setId, setCategory, showSaveButton, showUpdateButton, Save, update, handleCancel, errors }) {
    return (
        <div>
            <form>
                <input type="text" className="form-control" id="id" hidden value={id} onChange={(event) => setId(event.target.value)} />
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="name" value={productName} onChange={(event) => setName(event.target.value)} />
                    {errors.productName && <div className="text-danger">{errors.productName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productCode" className="form-label">Product Code<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="productCode" value={productCode} onChange={(event) => setProductCode(event.target.value)} />
                    {errors.productCode && <div className="text-danger">{errors.productCode}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity<span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                    {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category<span className="text-danger">*</span></label>
                    <select className="form-select" id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Books">Books</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                    </select>
                    {errors.category && <div className="text-danger">{errors.category}</div>}
                </div>
                <br />
                <div>
                    {showSaveButton && <button className="btn btn-primary me-2 w-25" onClick={Save}>Save</button>}
                    {showUpdateButton && <button className="btn btn-primary me-2 w-25" onClick={update}>Update</button>}
                    <button className="btn btn-secondary w-25" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
