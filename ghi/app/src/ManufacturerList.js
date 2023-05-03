import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ManufacturerList() {

    const [manus, setManus] = useState([]);
    const [del, setDel] = useState(null);

    const loadManus = async() =>{
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManus(data.manufacturers);
        }
    };
    useEffect(() => {
        loadManus();
    }, []);

    const handleConfirmDelete = async (event, manufacturerId) => {
        event.preventDefault();
        const url = `http://localhost:8100/api/manufacturers/${manufacturerId}/`;

        const fetchConfig = {
            method: "DELETE",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setManus(manus.filter(manu => manu.id !== manufacturerId));
        }
    };

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (manufacturerID) => { setDel(manufacturerID) };

    return (
        <div className='container'>
        <h1 className="mt-4">Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {manus.map(manufacturer => (
                    <tr key={manufacturer.id}>
                        <td>
                            {manufacturer.name}
                        </td>
                        <td>
                        {(del === manufacturer.id) ? (
                            <div className="d-grid gap-2">
                                <button onClick={(event) => handleConfirmDelete(event, manufacturer.id)} className="btn btn-outline-danger btn-sm" type="button">Confirm Delete</button>
                                <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm shadow-none" type="button">Cancel Delete</button>
                            </div>
                        ) : (
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to={`/manufacturers/edit/${manufacturer.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button onClick={() => handleDelete(manufacturer.id)} className="btn btn-danger btn-sm shadow-none">Delete</button>
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

export default ManufacturerList;
