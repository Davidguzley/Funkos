import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';

const Product = () => {
    const params = useParams();
    const sku = params.sku;
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

    const product = products.find(product => product.id === 1);
    return (
      <>
        {product ? 
        (
        <div>
            <Topbar></Topbar>

            <Container className="mt-4">
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '50rem' }}>
                    <Card.Img variant="top" src={product.image} alt={product.name} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>SKU: {product.sku}</Card.Text>
                        <Card.Text>Precio: {product.price}</Card.Text>
                        <Card.Text>Marca: {product.brand}</Card.Text>
                        <Card.Text>Descripción: {product.description}</Card.Text>
                    </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
        ) : <p>Esto no es un error, product es undefined.</p>}
      </>
    );
};

export default Product;
