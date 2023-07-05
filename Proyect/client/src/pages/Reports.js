import React, { useEffect,  useState} from 'react';
import { Container, Table } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

function Reports() {
    const [reports, setReports] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchReports = async () => {
            const response = await fetch('http://localhost:5000/api/report', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                setReports(json);
            }
        }

        if (user) {
            fetchReports()
        }
    }, [user]);

    return (
    <div>
        <Container className="mt-4">
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>SKU</th>
                <th>Token ID</th>
                <th>Product Name</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
            </thead>
            <tbody>
            {reports && reports.map((report) => (
                <tr key={report._id}>
                <td>{report.SKU}</td>
                <td>{report.token_id}</td>
                <td>{report.product_name}</td>
                <td>{report.createdAt}</td>
                <td>{report.updatedAt}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    </div>
    );
}

export default Reports;