import React, { useState } from 'react';
import { Form, InputGroup, Table, Badge, Modal, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const initialProductData = [
  { name: 'Steel Rods', category: 'Raw Materials', stock: 80, status: 'In Stock', lastRestocked: '2025-04-09' },
  { name: 'Cement Bags', category: 'Construction Material', stock: 35, status: 'Low Stock', lastRestocked: '2025-04-06' },
  { name: 'Copper Wire', category: 'Electrical', stock: 0, status: 'Out of Stock', lastRestocked: '2025-03-28' },
  { name: 'Glass Sheets', category: 'Packaging Material', stock: 60, status: 'In Stock', lastRestocked: '2025-04-08' },
  { name: 'Aluminum Foil', category: 'Manufacturing', stock: 20, status: 'Low Stock', lastRestocked: '2025-04-05' },
  { name: 'Cardboard Boxes', category: 'Packaging Material', stock: 150, status: 'In Stock', lastRestocked: '2025-04-10' },
  { name: 'Wooden Pallets', category: 'Logistics', stock: 50, status: 'Low Stock', lastRestocked: '2025-04-07' },
  { name: 'Plastic Granules', category: 'Raw Materials', stock: 110, status: 'In Stock', lastRestocked: '2025-04-08' },
  { name: 'Organic Apples', category: 'Fruits', stock: 120, status: 'In Stock', lastRestocked: '2025-04-08' },
  { name: 'Whole Wheat Bread', category: 'Bakery', stock: 0, status: 'Out of Stock', lastRestocked: '2025-04-01' },
  { name: 'Fresh Milk', category: 'Dairy', stock: 45, status: 'Low Stock', lastRestocked: '2025-04-09' },
];

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
  const [productList, setProductList] = useState(initialProductData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [restockAmount, setRestockAmount] = useState('');
  const [editForm, setEditForm] = useState({ name: '', category: '' });

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(productList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Products.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
  
    const tableColumn = ["Product", "Category", "Stock", "Status", "Last Restocked"];
    const tableRows = productList.map(product => [
      product.name,
      product.category,
      product.stock.toString(),
      product.status,
      product.lastRestocked,
    ]);
  
    doc.text("Product Inventory Report", 14, 15);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10 },
      theme: 'striped',
      headStyles: { fillColor: [52, 58, 64] },
    });
  
    doc.save("products.pdf");
  };
  
  

  // Restock
  const handleOpenModal = (index) => {
    setSelectedProductIndex(index);
    setRestockAmount('');
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleRestock = () => {
    const updatedProducts = [...productList];
    const selectedProduct = updatedProducts[selectedProductIndex];
    const newStock = selectedProduct.stock + parseInt(restockAmount);
    const today = new Date().toISOString().split('T')[0];
    updatedProducts[selectedProductIndex] = {
      ...selectedProduct,
      stock: newStock,
      status: determineStatus(newStock),
      lastRestocked: today,
    };
    setProductList(updatedProducts);
    setShowModal(false);
  };

  // Edit
  const handleOpenEditModal = (index) => {
    setSelectedProductIndex(index);
    const product = productList[index];
    setEditForm({ name: product.name, category: product.category });
    setShowEditModal(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveEdit = () => {
    const updated = [...productList];
    updated[selectedProductIndex] = {
      ...updated[selectedProductIndex],
      name: editForm.name,
      category: editForm.category,
    };
    setProductList(updated);
    setShowEditModal(false);
  };

  // Search
  const filteredProducts = productList.filter((product) =>
    [product.name, product.category, product.status].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className='m-4'>
      <h2 className="mb-1 fw-bold">Products</h2>
      <p className="text-muted mb-4">View and manage all the products you supply.</p>

      {/* Search Bar */}
      <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ boxShadow: 'none', outline: 'none' }}
        />
        {searchTerm && (
          <button className="btn btn-outline-secondary" onClick={() => setSearchTerm('')} style={{ boxShadow: 'none', outline: 'none' }}>
            Clear
          </button>
        )}
      </InputGroup>

      {/* Export Buttons */}
      <div className="mb-3 d-flex gap-2">
        <Button variant="success" onClick={exportToExcel}>⬇️ Export to Excel</Button>
        <Button variant="danger" onClick={exportToPDF}>📄 Export to PDF</Button>
      </div>

      {/* Product Table */}
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
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className={getStockLevelColor(product.stock)}>{product.stock}</td>
                <td>{getStatusBadge(product.status)}</td>
                <td>{product.lastRestocked}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleOpenEditModal(index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleOpenModal(index)}
                    >
                      ↻ Restock
                    </button>
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
          <Button variant="primary" onClick={handleRestock} disabled={!restockAmount}>
            Confirm Restock
          </Button>
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
            <Form.Control
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
