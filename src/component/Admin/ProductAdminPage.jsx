import React, { useState } from "react";

const ProductAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", stock: 0, location: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addProduct = () => {
    if (isEditing) {
      const updated = products.map((prod) =>
        prod.id === editId ? { ...form, id: editId } : prod
      );
      setProducts(updated);
      setIsEditing(false);
      setEditId(null);
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", category: "", stock: 0, location: "" });
  };

  const editProduct = (product) => {
    setForm(product);
    setIsEditing(true);
    setEditId(product.id);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    if (editId === id) {
      setIsEditing(false);
      setEditId(null);
      setForm({ name: "", category: "", stock: 0, location: "" });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-semibold border-bottom pb-2">Manage Products</h2>

      {/* Product Form */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">{isEditing ? "Edit Product" : "Add New Product"}</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              name="name"
              value={form.name}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              name="category"
              value={form.category}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              name="stock"
              value={form.stock}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Inventory Location"
              name="location"
              value={form.location}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-1">
            <button
              className={`btn ${isEditing ? "btn-success" : "btn-primary"} w-100`}
              onClick={addProduct}
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="card p-3">
        <h5 className="mb-3">Product List</h5>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.stock}</td>
                <td>{prod.location}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editProduct(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteProduct(prod.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No products added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductAdminPage;
