import {React, useEffect} from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useProductContext } from '../hooks/useProductContext';

function Home() {
    const {products, dispatch} = useProductContext();

    // Get all products
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000/api/product');
            const json = await response.json();

            if (response.ok) {
                console.log("traigo algo: ", json)
                dispatch({type: 'SET_PRODUCTS', payload: json});
            }
        }
        fetchProducts()
    }, [dispatch]);

    return (
        <div>
            <Container className="mt-4">
                <Row>
                {products && products.map((product) => (
                    <Col key={product._id} md={4} className="mb-4">
                    < Link to={`/product/${product._id}`}>
                        <Card>
                            <Card.Img variant="top" src={'https://files.cults3d.com/uploaders/14265452/illustration-file/0427d021-b91d-4146-9ffd-b1a05323527e/11721268-1054658741999706.jpg'} />
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