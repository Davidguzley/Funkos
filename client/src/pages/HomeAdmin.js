import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';

function HomeAdmin() {
  // Datos de ejemplo de los productos
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://static.pexels.com/photos/9611/flowers.jpg',
      price: 9.99,
      description: 'Product 1 description',
      sku: 'SKU-001',
      brand: 'Brand 1'
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://static.pexels.com/photos/9611/flowers.jpg',
      price: 14.99,
      description: 'Product 2 description',
      sku: 'SKU-002',
      brand: 'Brand 2'
    },
    // Agrega más productos aquí
  ];

  return (
    <div>
      {/*Navbar preparada con links y variable isAdmin*/}
      <Topbar></Topbar>

      <Container className="mt-4">
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Card.Text>SKU: {product.sku}</Card.Text>
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

      <footer className="bg-light text-center py-3">
        <p>Contact us: 123-456-789</p>
      </footer>
    </div>
  );
}

export default HomeAdmin;
