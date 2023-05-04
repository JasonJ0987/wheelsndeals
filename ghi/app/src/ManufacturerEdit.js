import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ManufacturerEdit() {
    const { id } = useParams();
    const [manufacturer, setManufacturer] = useState({});
    const [name, setName] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    const fetchManufacturer = async () => {
        const response = await fetch(`http://localhost:8100/api/manufacturers/${id}/`);
        if (response.ok) {
            const manufacturerData = await response.json();
            setManufacturer(manufacturerData);
        }
    }
    useEffect(() => {
        fetchManufacturer();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name=name;

        const manufacturerUrl = `http://localhost:8100/api/manufacturers/${id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            setName('');
            setIsEdited(true);
        }
    };

    let formClasses = "";
    let successClasses = "alert alert-success mb-0 d-none";
    if (isEdited) {
        formClasses = "d-none";
        successClasses = "alert alert-success mb-0";
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Edit a manufacturer</h1>
                    <form onSubmit={handleSubmit} className={formClasses}>
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleNameChange} placeholder="Manufacturer name..." required type="text" id="name" name="name" className="form-control" />
                            <label htmlFor="name">Manufacturer name: {manufacturer.name}</label>
                        </div>
                        <button className="btn btn-primary">
                            Edit
                        </button>
                    </form>
                    <div className={successClasses}>
                        Congratulations! You've edited the manufacturer!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManufacturerEdit;