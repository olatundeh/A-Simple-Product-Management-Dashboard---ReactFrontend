import React from 'react';

export default function ProductList({ products, editProduct, deleteProduct, showForm }) {
  return (
    <div className="container mt-4">
      <button className="btn btn-success mb-3" onClick={showForm}>Add New Product</button>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Category</th>
              <th scope="col">Name</th>
              <th scope="col">Product Code</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Date Added</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td>{product.category}</td>
                <td>{product.productName}</td>
                <td>{product.productCode}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => editProduct(product)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}