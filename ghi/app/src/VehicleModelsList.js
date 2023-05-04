import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function VehicleModelsList() {
    const [models, setModels] = useState([]);
    const [del, setDel] = useState(null);

    const loadModels = async () => {
        const response = await fetch("http://localhost:8100/api/models");
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    };
    useEffect(() => {loadModels();},[]);

    const handleConfirmDelete = async (event, modelId) => {
        event.preventDefault();
        const url = `http://localhost:8100/api/models/${modelId}/`;

        const fetchConfig = {
            method: "DELETE",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setModels(models.filter(model => model.id !== modelId));
        }
    };

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (modelID) => { setDel(modelID) };
    return (
        <div className='container'>
        <h1 className="mt-4">Models</h1>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => (
                    <tr key = {model.id}>
                        <td>{ model.name }</td>
                        <td>{ model.manufacturer.name }</td>
                        <td><img src={ model.picture_url } className="img-thumbnail" /></td>
                        <td>
                        {(del === model.id) ? (
                            <div className="d-grid gap-2">
                                <button onClick={(event) => handleConfirmDelete(event, model.id)} className="btn btn-outline-danger btn-sm" type="button">Confirm Delete</button>
                                <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm shadow-none" type="button">Cancel Delete</button>
                            </div>
                        ) : (
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to={`/models/edit/${model.id}`} className="btn btn-warning btn-sm flex-fill">Edit</Link>
                                <button onClick={() => handleDelete(model.id)} className="btn btn-danger btn-sm shadow-none flex-fill">Delete</button>
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
export default VehicleModelsList;
