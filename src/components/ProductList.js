import React from 'react';

export default function ProductList({ products, editProduct, deleteProduct }) {
  return (
    <div className="container mt-4">
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
            {products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.category}</td>
                <td>{product.productName}</td>
                <td>{product.productCode}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => editProduct(product)}>Edit</button> {/* Smaller buttons */}
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