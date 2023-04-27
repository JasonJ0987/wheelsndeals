import React, { useEffect, useState } from 'react';

function SalespersonList(){
    const [salespeople, setSalespeople] = useState([]);
    const [del, setDel] = useState(null);

    const loadSalesperson = async() => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };
    useEffect(() => {
        loadSalesperson();
    }, []);

    const handleConfirmDelete = async (event, salespersonId) => {
        event.preventDefault();
        const url = `http://localhost:8090/api/salespeople/${salespersonId}/`;

        const fetchConfig = {
            method: "DELETE",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setSalespeople(salespeople.filter(salesperson => salesperson.employee_id !== salespersonId));
        }
    };

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (salespersonID) => { setDel(salespersonID) };

    return(
        <div className="container">
            <h1 className="mt-4">Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(employee => (
                        <tr key={employee.employee_id}>
                            <td>
                                {employee.employee_id}
                            </td>
                            <td>
                                {employee.first_name}
                            </td>
                            <td>
                                {employee.last_name}
                            </td>
                            <td>
                            {(del === employee.employee_id) ? (
                                <div className="d-grid gap-2">
                                    <button onClick={(event) => handleConfirmDelete(event, employee.employee_id)} className="btn btn-outline-danger btn-sm" type="button">Confirm Delete</button>
                                    <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm" type="button">Cancel Delete</button>
                                </div>
                            ) : (
                                <button onClick={() => handleDelete(employee.employee_id)} className="btn btn-outline-danger btn-sm">Delete</button>
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default SalespersonList;
