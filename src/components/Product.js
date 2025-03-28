import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import ProductGraph from './ProductGraph';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function Product() {
    const [id, setId] = useState('');
    const [productName, setName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(true);
    const [errors, setErrors] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
        throw new Error('API URL is not defined in .env file.');
    }

    const Load = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/Product/GetAllProducts`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error loading products:', error);
            alert('Failed to load products. Please check the console for details.');
        }
    }, [apiUrl]);

    useEffect(() => {
        async function fetchData() {
            await Load();
        }
        fetchData();
    }, [Load]);

    async function Save(event) {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const productData = {
            productName: productName,
            productCode: productCode,
            price: price,
            quantity: quantity,
            category: category,
            createdAt: new Date().toISOString(),
        };
        try {
            await axios.post(`${apiUrl}/Product/AddProduct`, productData);
            alert('Product created successfully');
            resetForm();
            Load();
            setShowForm(false);
            setShowUpdateButton(false);
            setErrors({});
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to create product. Please try again.');
        }
    }

    async function editProduct(product) {
        setId(product.id);
        setName(product.productName);
        setProductCode(product.productCode);
        setPrice(product.price);
        setQuantity(product.quantity);
        setCategory(product.category);
        setShowForm(true);
        setShowUpdateButton(true);
        setShowSaveButton(false);
        setErrors({});
    }

    async function deleteProduct(id) {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${apiUrl}/Product/deleteProduct/${id}`);
                alert('Product deleted successfully');
                resetForm();
                Load();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again.');
            }
        }
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${apiUrl}/Product/UpdateProduct`, {
                id: id,
                productName: productName,
                productCode: productCode,   
                price: price,
                quantity: quantity,
                category: category,
            });
            alert('Product updated successfully');
            resetForm();
            Load();
            setShowForm(false);
            setErrors({});
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.');
        }
    }

    const resetForm = () => {
        setId('');
        setName('');
        setProductCode('');
        setPrice('');
        setQuantity('');
        setCategory('');
    };

    const handleCancel = () => {
        resetForm();
        setShowForm(false);
        setShowUpdateButton(false);
        setShowSaveButton(false);
        setErrors({});
    };

    const validateForm = () => {
        let errors = {};
        if (!productName) errors.productName = 'Name is required';
        if (!productCode) errors.productCode = 'Product Code is required';
        if (!price) errors.price = 'Price is required';
        if (!quantity) errors.quantity = 'Quantity is required';
        if (!category) errors.category = 'Category is required';
        return errors;
    };

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Product Management Dashboard App</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/graph">Product Graph</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={
                        <div className="container mt-4">
                            <h1 className="text-center mb-4">Product Details</h1>
                            {showForm ? (
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
                            ) : (
                                <ProductList products={products} editProduct={editProduct} deleteProduct={deleteProduct} showForm={() => { setShowForm(true); setShowSaveButton(true); resetForm() }} />
                            )}
                        </div>
                    } />
                    <Route path="/graph" element={<ProductGraph products={products} />} />
                </Routes>
            </div>
        </Router>
    );
}