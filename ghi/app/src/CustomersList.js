import React, { useEffect, useState } from 'react';

function CustomersList(){
    const [customers, setCustomers] = useState([]);
    const [del, setDel] = useState(null);

    const loadCustomers = async() => {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleConfirmDelete = async (event, customerId) => {
        event.preventDefault();
        const url = `http://localhost:8090/api/customers/${customerId}/`;

        const fetchConfig = {
            method: "DELETE",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setCustomers(customers.filter(customer => customer.id !== customerId));
        }
    };

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (customerID) => { setDel(customerID) };

    return(
        <div className="container">
            <h1 className="mt-4">Customers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>
                                {customer.first_name}
                            </td>
                            <td>
                                {customer.last_name}
                            </td>
                            <td>
                                {customer.phone_number}
                            </td><td>
                                {customer.address}
                            </td>
                            <td>
                            {(del === customer.id) ? (
                                <div className="d-grid gap-2">
                                    <button onClick={(event) => handleConfirmDelete(event, customer.id)} className="btn btn-outline-danger btn-sm" type="button">Confirm Delete</button>
                                    <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm" type="button">Cancel Delete</button>
                                </div>
                            ) : (
                                <button onClick={() => handleDelete(customer.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomersList;
