import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProductContext } from '../hooks/useProductContext';

function HomeAdmin() {
  const { products, dispatch } = useProductContext();
  const [SKU, setSKU] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editSKU, setEditSKU] = useState('');
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState(null);
  const [editBrand, setEditBrand] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const { user } = useAuthContext();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
    setEditProduct(null);
    setEditSKU('');
    setEditName('');
    setEditPrice(null);
    setEditBrand('');
    setEditDescription('');
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (user == null) {
      setError('You must be logged in');
      return;
    }

    setIsLoading(true);
    setError(null);

    const newProduct = {
      SKU: SKU,
      name: name,
      price: price,
      brand: brand,
      description: description
    };

    try {
      const response = await fetch('http://localhost:5000/api/product', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const json = await response.json();
        newProduct._id = json._id;
        dispatch({ type: 'CREATE_PRODUCT', payload: newProduct });

        setSKU('');
        setName('');
        setPrice(null);
        setBrand('');
        setDescription('');
        setError(null);
        handleCloseModal();
      } else {
        const json = await response.json();
        setError(json.error);
      }

      setIsLoading(false);
    } catch (error) {
      setError('An error occurred while saving the product.');
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_PRODUCT', payload: { _id: productId } });
      } else {
        const json = await response.json();
        setError(json.error);
      }
    } catch (error) {
      setError('An error occurred while deleting the product.');
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setEditSKU(product.SKU);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditBrand(product.brand);
    setEditDescription(product.description);
    handleShowModal();
  };

  const handleUpdateProduct = async () => {
    if (editProduct == null) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const updatedProduct = {
      SKU: editSKU,
      name: editName,
      price: editPrice,
      brand: editBrand,
      description: editDescription
    };

    try {
      const response = await fetch(`http://localhost:5000/api/product/${editProduct._id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedProduct),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: { _id: editProduct._id, ...updatedProduct } });

        setError(null);
        handleCloseModal();
      } else {
        setError(json.error);
      }

      setIsLoading(false);
    } catch (error) {
      setError('An error occurred while updating the product.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_PRODUCTS', payload: json });
        }
      } catch (error) {
        setError('An error occurred while fetching the products.');
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <Container className="mt-4">
        <Button variant="success" onClick={handleShowModal}>
          Add Product
        </Button>
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src="https://files.cults3d.com/uploaders/14265452/illustration-file/0427d021-b91d-4146-9ffd-b1a05323527e/11721268-1054658741999706.jpg"
                  />
                  <Card.Body>
                    <Card.Title>
                      <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> ${product.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>SKU:</strong> {product.SKU}
                    </Card.Text>
                    <Card.Text>
                      <strong>Brand:</strong> {product.brand}
                    </Card.Text>
                    <Card.Text>
                      <strong>Description:</strong> {product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary" onClick={() => handleEditProduct(product)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} disabled={isLoading}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={editProduct ? handleUpdateProduct : handleSaveProduct}>
            <Form.Group controlId="formSKU">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SKU"
                value={editProduct ? editSKU : SKU}
                onChange={editProduct ? (e) => setEditSKU(e.target.value) : (e) => setSKU(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={editProduct ? editName : name}
                onChange={editProduct ? (e) => setEditName(e.target.value) : (e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={editProduct ? editPrice : price}
                onChange={editProduct ? (e) => setEditPrice(e.target.value) : (e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={editProduct ? editBrand : brand}
                onChange={editProduct ? (e) => setEditBrand(e.target.value) : (e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                value={editProduct ? editDescription : description}
                onChange={editProduct ? (e) => setEditDescription(e.target.value) : (e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {editProduct ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HomeAdmin;
