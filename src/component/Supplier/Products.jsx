// src/components/Products.jsx
import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Table, Badge, Modal, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const getStatusBadge = (status) => {
  switch (status) {
    case 'In Stock': return <Badge bg="success">{status}</Badge>;
    case 'Out of Stock': return <Badge bg="danger">{status}</Badge>;
    case 'Low Stock': return <Badge bg="warning" text="dark">{status}</Badge>;
    default: return <Badge bg="secondary">{status}</Badge>;
  }
};

const getStockLevelColor = (stock) => {
  if (stock === 0) return 'text-danger fw-bold';
  if (stock < 50) return 'text-warning fw-bold';
  return 'text-success fw-bold';
};

const determineStatus = (stock) => {
  if (stock === 0) return 'Out of Stock';
  if (stock < 50) return 'Low Stock';
  return 'In Stock';
};

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [restockAmount, setRestockAmount] = useState('');
  const [editForm, setEditForm] = useState({ name: '', category: '', stockQuantity: '' });
  const [addForm, setAddForm] = useState(false);
  const backendUrl = 'http://localhost:8080/api/product';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(backendUrl);
      setProductList(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(productList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Products.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Product', 'Category', 'StockQuantity', 'Status', 'Last Restocked'];
    const tableRows = productList.map((product) => [
      product.name,
      product.category,
      product.stockQuantity.toString(),
      product.status,
      product.lastRestocked,
    ]);
    doc.text('Product Inventory Report', 14, 15);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10 },
      theme: 'striped',
      headStyles: { fillColor: [52, 58, 64] },
    });
    doc.save('products.pdf');
  };

  const addProduct = () => {
    setEditForm({ name: '', category: '', stockQuantity: '' });
    setAddForm(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = async () => {
    const { name, category, stockQuantity } = editForm;
    if (!name || !category || stockQuantity === '') return;

    const stockNumber = parseInt(stockQuantity);
    const today = new Date().toISOString().split('T')[0];

    const newProduct = {
      name,
      category,
      stockQuantity: stockNumber,
      status: determineStatus(stockNumber),
      lastRestocked: today,
    };

    try {
      await axios.post(backendUrl, newProduct);
      fetchProducts();
      setAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleOpenModal = (index) => {
    setSelectedProductIndex(index);
    setRestockAmount('');
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleRestock = async () => {
    const selectedProduct = productList[selectedProductIndex];
    const newStock = selectedProduct.stockQuantity + parseInt(restockAmount);
    const today = new Date().toISOString().split('T')[0];

    const updatedProduct = {
      ...selectedProduct,
      stockQuantity: newStock,
      status: determineStatus(newStock),
      lastRestocked: today,
    };

    try {
      await axios.put(`${backendUrl}/${selectedProduct.id}`, updatedProduct);
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error restocking:', error);
    }
  };

  const handleOpenEditModal = (index) => {
    setSelectedProductIndex(index);
    const product = productList[index];
    setEditForm({
      name: product.name,
      category: product.category,
      stockQuantity: product.stockQuantity,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    const updatedStock = parseInt(editForm.stockQuantity);
    const updatedProduct = {
      ...productList[selectedProductIndex],
      name: editForm.name,
      category: editForm.category,
      stockQuantity: updatedStock,
      status: determineStatus(updatedStock),
    };

    try {
      await axios.put(`${backendUrl}/${updatedProduct.id}`, updatedProduct);
      fetchProducts();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const filteredProducts = productList.filter((product) =>
    [product.name, product.category, product.status].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="m-4">
      <h2 className="mb-1 fw-bold">Products</h2>
      <p className="text-muted mb-4">View and manage all the products you supply.</p>

      <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ boxShadow: 'none' }}
        />
        {searchTerm && (
          <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
            Clear
          </Button>
        )}
      </InputGroup>

      <div className="mb-3 d-flex gap-2">
        <Button variant="success" onClick={exportToExcel}>⬇️ Export to Excel</Button>
        <Button variant="danger" onClick={exportToPDF}>📄 Export to PDF</Button>
        <Button variant="primary" onClick={addProduct}>➕ Add Product</Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Stock Level</th>
            <th>Status</th>
            <th>Last Restocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className={getStockLevelColor(product.stockQuantity)}>{product.stockQuantity}</td>
                <td>{getStatusBadge(product.status)}</td>
                <td>{product.lastRestocked}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="outline-secondary" onClick={() => handleOpenEditModal(index)}>✏️ Edit</Button>
                    <Button size="sm" variant="primary" onClick={() => handleOpenModal(index)}>↻ Restock</Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">No products found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Restock Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Restock Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You're restocking: <strong>{productList[selectedProductIndex]?.name}</strong></p>
          <Form.Group>
            <Form.Label>Enter quantity to restock:</Form.Label>
            <Form.Control
              type="number"
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
              min="1"
              placeholder="e.g., 100"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleRestock} disabled={!restockAmount}>Confirm Restock</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control name="name" value={editForm.name} onChange={handleEditChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={editForm.category} onChange={handleEditChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock Quantity</Form.Label>
            <Form.Control name="stockQuantity" type="number" value={editForm.stockQuantity} onChange={handleEditChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Product Modal */}
      <Modal show={addForm} onHide={() => setAddForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control name="name" value={editForm.name} onChange={handleAddChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={editForm.category} onChange={handleAddChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control name="stockQuantity" type="number" value={editForm.stockQuantity} onChange={handleAddChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddForm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveProduct}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
