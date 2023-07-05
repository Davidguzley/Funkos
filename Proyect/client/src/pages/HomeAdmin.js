import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProductContext } from '../hooks/useProductContext';

function HomeAdmin() {
  const { products, dispatch } = useProductContext();

  // Get all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/product');
      const json = await response.json();

      if (response.ok) {
        console.log("traigo algo: ", json)
        dispatch({ type: 'SET_PRODUCTS', payload: json });
      }
    }
    fetchProducts()
  }, [dispatch]);

  return (
    <div>
      <Container className="mt-4">
        <Row>
          {products && products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={'https://files.cults3d.com/uploaders/14265452/illustration-file/0427d021-b91d-4146-9ffd-b1a05323527e/11721268-1054658741999706.jpg'} />
                <Card.Body>
                  <Card.Title><strong>{product.name}</strong></Card.Title>
                  <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                  <Card.Text><strong>SKU:</strong> {product.SKU}</Card.Text>
                  <Card.Text><strong>Brand:</strong> {product.brand}</Card.Text>
                  <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/product/${product.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button variant="danger">Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomeAdmin;