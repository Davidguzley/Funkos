import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    // Get a single product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/product/${id}`);
                const json = await response.json();

                if (response.ok) {
                    setError(null);
                    setProduct(json);
                } else {
                    setError(json.error);
                }
            } catch (error) {
                setError('An error occurred while fetching the product.');
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <>
            {!error ? (
                <div>
                    <Container className="mt-4">
                        <div className="d-flex justify-content-center">
                            <Card style={{ width: '50rem' }}>
                                <Card.Img variant="top" src={'https://files.cults3d.com/uploaders/14265452/illustration-file/0427d021-b91d-4146-9ffd-b1a05323527e/11721268-1054658741999706.jpg'} alt={product?.name} />
                                <Card.Body>
                                    <Card.Title><strong>{product?.name}</strong></Card.Title>
                                    <Card.Text><strong>SKU:</strong> {product?.SKU}</Card.Text>
                                    <Card.Text><strong>Price:</strong> {product?.price}</Card.Text>
                                    <Card.Text><strong>Brand:</strong> {product?.brand}</Card.Text>
                                    <Card.Text><strong>Description:</strong> {product?.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Container>
                </div>
            ) : (
                <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
            )}
        </>
    );
};

export default Product;