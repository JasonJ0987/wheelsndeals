import React, { useState, useEffect } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);
    const [del, setDel] = useState(null);

    const loadTechnicians = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };
    useEffect(() => {loadTechnicians();}, []);

    const handleConfirmDelete = async (event, technicianId) => {
        event.preventDefault();
        const url = `http://localhost:8080/api/technicians/${technicianId}`;

        const fetchConfig = {
            method: "DELETE",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setTechnicians(technicians.filter(technician => technician.id !== technicianId));
        }
    };

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (technicianID) => { setDel(technicianID) };

    return (
        <div className='container'>
        <h1 className="mt-4">Technicians</h1>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map(technician => (
                    <tr key={technician.id}>
                        <td>{technician.employee_id}</td>
                        <td>{technician.first_name}</td>
                        <td>{technician.last_name}</td>
                        <td>
                        {(del === technician.id) ? (
                            <div className="d-grid gap-2">
                                <button onClick={(event) => handleConfirmDelete(event, technician.id)} className="btn btn-outline-danger btn-sm" type="button">Confirm Delete</button>
                                <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm" type="button">Cancel Delete</button>
                            </div>
                        ) : (
                            <button onClick={() => handleDelete(technician.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                        )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};
export default TechnicianList;
