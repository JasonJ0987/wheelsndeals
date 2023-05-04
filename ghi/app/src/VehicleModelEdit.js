import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VehicleModelEdit() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
    });
    const [model, setModel] = useState({});
    const [isEdited, setIsEdited] = useState(false);

    const fetchModel = async () => {
        const response = await fetch(`http://localhost:8100/api/models/${id}/`);
        if (response.ok) {
            const modelData = await response.json();
            setModel(modelData);
        }
    }
    useEffect(() => {
        fetchModel();
    }, []);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({...formData ,[inputName]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:8100/api/models/${id}/`;

        const fetchConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                name: '',
                picture_url: '',
            });
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
                <h1>Edit a vehicle model</h1>
                <form onSubmit={handleSubmit} className={formClasses}>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.name} placeholder="Model name..." required type="text" name="name" className="form-control" />
                    <label htmlFor="name">Model name: {model.name}</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL..." required type="url" name="picture_url" className="form-control" />
                    <label htmlFor="picture_url">Picture URL...</label>
                </div>
                <button className="btn btn-primary">Edit</button>
                </form>
                <div className={successClasses}>
                    Congratulations! You've edited the vehicle model!
                </div>
            </div>
            </div>
        </div>
    );
};
export default VehicleModelEdit;
