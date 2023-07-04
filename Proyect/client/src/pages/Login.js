import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setError(null);

    e.preventDefault();
  
    const admin = {
      email: email,
      password: password
    };
  
    const response = await fetch('http://localhost:5000/api/authentication/login', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
  
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('admin', JSON.stringify(json))

      //update the auth context
      dispatch({type: 'LOGIN', payload: json});
      setEmail('');
      setPassword('');
      setError(null);
      setIsLoading(false);
      window.location.href = '/';
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="login-box">
          <Form className="login" onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <br></br>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Log in
            </Button>
          </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
