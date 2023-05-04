import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);
    const [del, setDel] = useState(null);

    const loadSales = async() => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };

    useEffect(() => {
        loadSales();
    }, []);

    const handleConfirmDelete = async (event, saleId) => {
        event.preventDefault();
        const url = `http://localhost:8090/api/sales/${saleId}/`;

        const fetchConfig = {
            method: "DELETE",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setSales(sales.filter(sale => sale.id !== saleId));
        }
    };

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (saleID) => { setDel(saleID) };

    return(
        <div className="container">
            <h1 className="mt-4">Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>
                                {sale.salesperson.employee_id}
                            </td>
                            <td>
                                {sale.salesperson.first_name} {sale.salesperson.last_name}
                            </td>
                            <td>
                                {sale.customer.first_name} {sale.customer.last_name}
                            </td>
                            <td>
                                {sale.automobile.vin}
                            </td>
                            <td>
                                ${sale.price}
                            </td>
                            <td>
                            {(del === sale.id) ? (
                                <div className="d-grid gap-2">
                                    <button onClick={(event) => handleConfirmDelete(event, sale.id)} className="btn btn-outline-danger btn-sm shadow-none" type="button">Confirm Delete</button>
                                    <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm" type="button">Cancel Delete</button>
                                </div>
                            ) : (
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button onClick={() => handleDelete(sale.id)} className="btn btn-danger btn-sm">Delete</button>
                                </div>
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;
