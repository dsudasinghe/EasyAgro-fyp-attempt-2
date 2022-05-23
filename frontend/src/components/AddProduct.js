import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newProduct = {
      name,
      price,
      description,
    };

    axios
      .post("http://localhost:8070/product/add", newProduct)
      .then(() => {
        alert("Product Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Product Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label for="age" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Product Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label for="gender" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="gender"
            placeholder="Product description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
