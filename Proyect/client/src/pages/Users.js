import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

function Users() {
  const [users, setUsers] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();

  // Fetches the list of admin users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  // Opens the modal to add a new user
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Closes the modal and resets the form
  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
  };

  // Saves a new user to the API
  const handleSaveUser = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    setIsLoading(true);
    setError(null);

    const newUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:5000/api/admin', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setError(null);
        handleCloseModal();
        setIsLoading(false);
        fetchUsers(); // Refresh the list of users after saving
      } else {
        setError(json.error);
        setIsLoading(false);
      }
    } catch (error) {
      setError('Failed to save user');
      setIsLoading(false);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default Users;
