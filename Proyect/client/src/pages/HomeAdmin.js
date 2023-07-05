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
  const { user } = useAuthContext();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
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
                      <Link to={`/product/${product._id}`}>
                        <Button variant="primary">Edit</Button>
                      </Link>
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
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form className="createAdmin">
            <Form.Group controlId="SKU">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SKU"
                name="SKU"
                value={SKU}
                onChange={(e) => setSKU(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={isLoading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProduct} disabled={isLoading}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomeAdmin;