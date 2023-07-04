import React from 'react';
import { Container, Table } from 'react-bootstrap';

function Reports() {
    // Datos de ejemplo de los informes
    const reports = [
    {
        SKU: 'SKU-001',
        token_id: '123456789',
        product_name: 'Product 1',
        visit_datetime: new Date()
    },
    {
        SKU: 'SKU-002',
        token_id: '987654321',
        product_name: 'Product 2',
        visit_datetime: new Date()
    },
    // Agrega más informes aquí
    ];

    return (
    <div>
        <Container className="mt-4">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Token ID</th>
                    <th>Product Name</th>
                    <th>Visit Datetime</th>
                </tr>
            </thead>
            <tbody>
            {reports.map((report, index) => (
                <tr key={index}>
                    <td>{report.SKU}</td>
                    <td>{report.token_id}</td>
                    <td>{report.product_name}</td>
                    <td>{report.visit_datetime.toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    </div>
    );
}

export default Reports;