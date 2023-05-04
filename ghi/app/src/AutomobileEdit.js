import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AutomobileEdit() {
    const { vin } = useParams();
    const [formData, setFormData] = useState({
        color: '',
        year: '',
        sold: false,
    });
    const [automobile, setAutomobile] = useState({});
    const [isEdited, setIsEdited] = useState(false);

    const fetchAutomobile = async () => {
        const response = await fetch(`http://localhost:8100/api/automobiles/${vin}/`);
        if (response.ok) {
            const automobileData = await response.json();
            setAutomobile(automobileData);
        }
    }
    useEffect(() => {
        fetchAutomobile();
    }, []);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({...formData ,[inputName]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:8100/api/automobiles/${vin}/`;
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
                color: '',
                year: '',
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
                <h1>Edit an automobile</h1>
                <form onSubmit={handleSubmit} className={formClasses}>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.color} placeholder="Color..." required type="text" name="color" className="form-control" />
                    <label htmlFor="name">Color: {automobile.color}</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.year} placeholder="Year..." required type="number" name="year" className="form-control" />
                    <label htmlFor="year">Year: {automobile.year}</label>
                </div>
                <button className="btn btn-primary">Edit</button>
                </form>
                <div className={successClasses}>
                    Congratulations! You've edited the automobile!
                </div>
            </div>
            </div>
        </div>
    );
};
export default AutomobileEdit;