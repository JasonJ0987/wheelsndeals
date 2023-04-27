import React, { useEffect, useState } from 'react';

function SalesForm() {
    const [sales, setSales] = useState([]);

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesForm;
