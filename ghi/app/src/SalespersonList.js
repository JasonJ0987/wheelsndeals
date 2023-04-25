import React, { useEffect, useState } from 'react';

function SalespersonList(){
    const [salesperson, setSalesperson] = useState([]);

    const loadSalesperson = async() => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salespeople);
        };
    };
    useEffect(() => {
        loadSalesperson();
    }, []);

    return(
        <div>
            <h1>Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salesperson.map(employee => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default SalespersonList
