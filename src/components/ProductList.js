import React from 'react';

export default function ProductList({ products, editProduct, deleteProduct }) {
  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
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
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.createdAt}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => editProduct(product)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}