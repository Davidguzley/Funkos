import { Navbar, Nav, Button, Container} from 'react-bootstrap';

const Topbar = () => {
    const isAdmin = false;

    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>
            <Navbar.Brand href="/">Funkos</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >

            {isAdmin ? (
            <>
                <Nav.Link href="/">Products</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/reports">Reports</Nav.Link>
            </>
            ) : null}

            </Nav>
                <Button variant="outline-success" href={isAdmin ? "/logout" : "/login"}>
                    {isAdmin ? "Logout" : "Login"}
                </Button>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    )

};

export default Topbar