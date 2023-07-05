import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

function Users() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
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
  const handleShowModal = (admin) => {
    if (admin) {
      setEditId(admin._id);
      setEditFirstName(admin.first_name);
      setEditLastName(admin.last_name);
      setEditEmail(admin.email);
      setEditPassword('');
    } else {
      setEditId('');
      setEditFirstName('');
      setEditLastName('');
      setEditEmail('');
      setEditPassword('');
    }
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
      first_name: editFirstName,
      last_name: editLastName,
      email: editEmail,
      password: editPassword
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
        setEditFirstName('');
        setEditLastName('');
        setEditEmail('');
        setEditPassword('');
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

  // Updates an existing user in the API
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    setIsLoading(true);
    setError(null);

    const updatedUser = {
      first_name: editFirstName,
      last_name: editLastName,
      email: editEmail,
      password: editPassword
    };

    try {
      const response = await fetch(`http://localhost:5000/api/admin/${editId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setEditFirstName('');
        setEditLastName('');
        setEditEmail('');
        setEditPassword('');
        setError(null);
        handleCloseModal();
        setIsLoading(false);
        fetchUsers(); // Refresh the list of users after updating
      } else {
        setError(json.error);
        setIsLoading(false);
      }
    } catch (error) {
      setError('Failed to update user');
      setIsLoading(false);
    }
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        setError('Failed to delete user');
      }
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <Container className="mt-4">
        <Button variant="success" onClick={() => handleShowModal(null)}>
          Add Admin
        </Button>
        <ListGroup>
          {users.map((user) => (
            <ListGroup.Item key={user._id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {user.first_name} {user.last_name}
                </div>
                <div>
                  <Button variant="primary" onClick={() => handleShowModal(user)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteUser(user._id)}>
                    Delete
                  </Button>
                </div>
              </div>
              <div>Email: {user.email}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} disabled={isLoading}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Admin' : 'Add Admin'}</Modal.Title>
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
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="last_name"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </Form.Group>
            {editId ? null : ( // Render the password field only in the Add User modal
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={isLoading}>
            Close
          </Button>
          <Button variant="primary" onClick={editId ? handleUpdateUser : handleSaveUser} disabled={isLoading}>
            {editId ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;