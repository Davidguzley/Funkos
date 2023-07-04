import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Home() {
    const products = [
    {
        id: 1,
        name: 'Product 1',
        image: 'https://files.cults3d.com/uploaders/14265452/illustration-file/0427d021-b91d-4146-9ffd-b1a05323527e/11721268-1054658741999706.jpg',
        price: 9.99,
        description: 'Product 1 description',
        sku: 'SKU-001',
        brand: 'Brand 1'
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://files.cults3d.com/uploaders/14265452/illustration-file/0427d021-b91d-4146-9ffd-b1a05323527e/11721268-1054658741999706.jpg',
        price: 14.99,
        description: 'Product 2 description',
        sku: 'SKU-002',
        brand: 'Brand 2'
    },
    // Agrega más productos aquí
    ];

    return (
        <div>
            <Container className="mt-4">
                <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} className="mb-4">
                    < Link to={`/product/${product.id}`}>
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    </Col>
                ))}
                </Row>
            </Container>
        </div>
    )
}

export default Home;