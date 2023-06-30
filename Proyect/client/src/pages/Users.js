import React, { useState } from 'react';
import { Container, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';

function Users() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
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
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();

    console.log(email, password);
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
                  {user.firstName} {user.lastName}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="createAdmin">
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
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
