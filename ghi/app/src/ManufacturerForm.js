import React, { useState } from 'react';

function ManufacturerForm() {

    const [name, setName] = useState('');
    const [isCreated, setIsCreated] = useState(false);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {};
        data.name=name;

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            setName('');
            setIsCreated(true);
        }
    }

    let formClasses = "";
    let successClasses = "alert alert-success mb-0 d-none";
    if (isCreated) {
        formClasses = "d-none";
        successClasses = "alert alert-success mb-0";
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a new manufacturer</h1>
                    <form onSubmit={handleSubmit} className={formClasses}>
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleNameChange} placeholder="Manufacturer Name..." required type="text" id="name" name="name" className="form-control" />
                            <label htmlFor="name">Manufacturer Name...</label>
                        </div>
                        <button className="btn btn-primary">
                            Create
                        </button>
                    </form>
                    <div className={successClasses}>
                        Congratulations! You've created a new manufacturer!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerForm
