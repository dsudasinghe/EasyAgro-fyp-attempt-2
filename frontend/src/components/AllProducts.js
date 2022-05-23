import React, { useState, useEffect } from "react";
import axios from "axios";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:8070/product/")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function deleteProduct(_id) {
    axios.delete(`http://localhost:8070/product/delete/${_id}`).then((res) => {
      console.log(res);
      console.log(res.data);
      const newProductList = products.filter((product) => product._id !== _id);
      setProducts(newProductList);
    });
  }

  return (
    <div>
      <h2 className="container">Fertilizer/Plants/Farmer Equipment List</h2>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>LKR {product.price}</td>
              <td>{product.description}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  <i className="bi bi-pencil-square"></i>&nbsp;Edit
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product._id)}
                >
                  <i className="bi bi-x-circle"></i>&nbsp; Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
