import React, { useState } from 'react';


function SalespersonForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    });
    const [isCreated, setIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({...formData,[inputName]: value});
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const url = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method:"post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                first_name: '',
                last_name: '',
                employee_id: '',
            });
            setIsCreated(true);
        } else {
            setIsError(true);
            throw new Error('Error');
        }
    };

    let formClasses = "";
    let successClasses = "alert alert-success mb-0 d-none";
    let errorClasses = "alert alert-danger mb-0 d-none";

    if (isError) {
        formClasses = "d-none";
        errorClasses = "alert alert-danger mb-0";
    }
    if (isCreated) {
        formClasses = "d-none";
        successClasses = "alert alert-success mb-0";
    }


    return(
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a Salesperson</h1>
                <form onSubmit={handleSubmit} className={formClasses}>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.first_name} placeholder="First name..." required type="text" name="first_name" className="form-control" />
                    <label htmlFor="first_name">First name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.last_name} placeholder="Last name..." required type="text" name="last_name" className="form-control" />
                    <label htmlFor="last_name">Last name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee ID..." required type="text" name="employee_id" className="form-control" />
                    <label htmlFor="employee_id">Employee ID...</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
                <div className={successClasses}>
                    Congratulations! Welcome to the CarCar Team!
                </div>
                <div className={errorClasses}>
                    Something went wrong. Please confirm your employee ID.
                </div>
            </div>
            </div>
        </div>
    );
};

export default SalespersonForm;
