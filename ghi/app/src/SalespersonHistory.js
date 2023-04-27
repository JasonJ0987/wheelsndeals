import React, { useEffect, useState } from 'react'

function SalespersonHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);
    const [sale, setSale] = useState('');

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSale(value);
    };

    const loadEmployees = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };
    const loadSales = async () => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);
    useEffect(() => {
        loadSales();
    }, []);

    return(
        <div className="container">
        <div className = "container mb-3">
            <h1 className="mt-4">Salesperson History</h1>
            <select onChange={handleSelectChange} className="form-select">
                <option value="">Choose a salesperson</option>
                {salespeople.map(salesperson => (
                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
                        {salesperson.first_name} {salesperson.last_name}
                    </option>
                ))}
            </select>
        </div>
        <div className="container mb-3">
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.filter(records => records.salesperson.employee_id === sale).map(record => (
                            <tr key={record.automobile.vin}>
                                <td>{record.salesperson.first_name} {record.salesperson.last_name}</td>
                                <td>{record.customer.first_name} {record.customer.last_name}</td>
                                <td>{record.automobile.vin}</td>
                                <td>${record.price}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
        </div>
    );
};

export default SalespersonHistory;
