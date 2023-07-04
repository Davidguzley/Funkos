import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica de inicio de sesión
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="login-box">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu email" />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" />
              </Form.Group>

              <Link to="/">
                <Button variant="primary" type="submit">
                  Iniciar sesión
                </Button>
              </Link>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
