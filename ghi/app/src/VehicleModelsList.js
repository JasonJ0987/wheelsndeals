import React, { useState, useEffect } from 'react';

function VehicleModelsList() {
    const [models, setModels] = useState([]);

    const loadModels = async () => {
        const response = await fetch("http://localhost:8100/api/models");
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    };
    useEffect(() => {loadModels();},[]);

    return (
        <div className='container'>
        <h1>Models</h1>
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
                        <td><img src={ model.picture_url } /></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}
export default VehicleModelsList
