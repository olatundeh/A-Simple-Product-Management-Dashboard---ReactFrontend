import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import ProductGraph from './ProductGraph';

export default function () {
    const [id, setId] = React.useState('');
    const [productname, setName] = React.useState('');
    const [productcode, setProductCode] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [products, setProduct] = React.useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
  
    if (!apiUrl) {
        throw new Error('API URL is not defined in .env file.');
    }

    useEffect(() => {
        (async () => await Load())();
    }
    , []);

    async function Load() {
        try {
            const response = await axios.get(`${apiUrl}/Product/GetAllProducts`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error loading products:', error);
            alert('Failed to load products. Please check the console for details.');
        }
    }

    async function Save(event) {
        event.preventDefault();
        try {
            await axios.post(`${apiUrl}/Product/AddProduct`, {
                id: id,
                productname: productname,
                productcode: productcode,
                price: price,
                quantity: quantity,
                category: category
            });
            alert('Product created successfully');
            setId('');
            setName('');
            setProductCode('');
            setPrice('');
            setQuantity('');
            setCategory('');
            Load();
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
    }

    async function deleteProduct(id) {
        try {
            await axios.delete(`${apiUrl}/Product/deleteProduct/` + id);
            alert('Product deleted successfully');
            setId('');
            setName('');
            setProductCode('');
            setPrice('');
            setQuantity('');
            setCategory('');
            Load();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${apiUrl}/Product/UpdateProduct/` + products.find((u) => u.id === id).id ||
            id, {
                id: id,
                productname: productname,
                productcode: productcode,
                price: price,
                quantity: quantity,
                category: category
            });
            alert('Product updated successfully');
            setId('');
            setName('');
            setProductCode('');
            setPrice('');
            setQuantity('');
            setCategory('');
            Load();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.');
        }
    }

    return (
        <div>
            <h1>Product Details</h1>
            <div className="container mt-4">
                <form>
                    <input type="text" className="form-control" id="id" hidden value={id} onChange={(event) => {
                        setId(event.target.value);
                    }} />
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="productName" value={productname} onChange={(event) => {
                            setName(event.target.value);
                        }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productCode" className="form-label">Product Code</label>
                        <input type="text" className="form-control" id="productCode" aria-describedby="productCode" value={productcode} onChange={(event)=> {
                            setProductCode(event.target.value);
                        }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" aria-describedby="price" value={price} onChange={(event)=> {
                            setPrice(event.target.value);
                        }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="number" className="form-control" id="quantity" aria-describedby="quantity" value={quantity} onChange={(event)=> {
                            setQuantity(event.target.value);
                        }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" aria-describedby="category" value={category} onChange={(event)=> {
                            setCategory(event.target.value);
                        }}
                        />
                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={Save}>Save</button>
                        <button className='btn btn-primary' onClick={update}>Update</button>
                    </div>
                </form>

            </div>
            <ProductGraph products={products} />
            <ProductList products={products} editProduct={editProduct} deleteProduct={deleteProduct} />
        </div>
    )
}
