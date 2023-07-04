import React, { useState } from 'react';
import { Container, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import Topbar from '../components/Topbar';

function Users() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const users = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com'
    },
    // Agrega más usuarios aquí
  ];

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null); // Limpiar el error al cerrar el modal
  };

  const handleSaveUser = async (e) => {
    setIsLoading(true);
    setError(null);

    e.preventDefault();
  
    const admin = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    };
  
    const response = await fetch('http://localhost:5000/api/admin', {
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
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setError(null);
      handleCloseModal();
      setIsLoading(false);
    }
  };  

  return (
    <div>
      <Topbar></Topbar>

      <Container className="mt-4">
        <Button variant="success" onClick={handleShowModal}>
          Add User
        </Button>
        <ListGroup>
          {users.map((user) => (
            <ListGroup.Item key={user.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {user.first_name} {user.last_name}
                </div>
                <div>
                  <Button variant="primary">Edit</Button>
                  <Button variant="danger">Delete</Button>
                </div>
              </div>
              <div>Email: {user.email}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} disabled={isLoading}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form className="createAdmin">
            <Form.Group controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={isLoading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser} disabled={isLoading}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <footer className="bg-light text-center py-3">
        <p>Contact us: 123-456-789</p>
      </footer>
    </div>
  );
}

export default Users;
