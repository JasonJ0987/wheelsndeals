import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [formData, setFormData] = useState({
        vin: '',
        customer: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
    });

    const [isCreated, setIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({...formData ,[inputName]: value});
    };

    const [technicians, setTechnicians] = useState([]);
    const fetchTechnicians = async ()=> {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };
    useEffect(() => {fetchTechnicians();}, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = formData.vin;
        data.customer = formData.customer;
        data.date_time = new Date(`${formData.date}T${formData.time}`).toISOString();
        data.technician = formData.technician;
        data.reason = formData.reason;

        const url = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json', },
        };
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setFormData({
                vin: '',
                customer: '',
                date: '',
                time: '',
                technician: '',
                reason: '',
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

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a service appointment</h1>
                <form className={formClasses} onSubmit={handleSubmit} >
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.vin} name="vin" placeholder="Automobile VIN..." required type="text" className="form-control" />
                    <label htmlFor="vin">Automobile VIN...</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.customer} name="customer" placeholder="Customer..." required type="text" className="form-control" />
                    <label htmlFor="customer">Customer...</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.date} name="date" placeholder="Date..." required type="date" className="form-control" />
                    <label htmlFor="date">Date...</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.time} name="time" placeholder="Time..." required type="time" className="form-control" />
                    <label htmlFor="time">Time...</label>
                </div>
                <div className="mb-3">
                    <select required onChange={handleFormChange} value={formData.technician} name="technician" className="form-select">
                    <option value="">Choose a technician...</option>
                    {technicians.map(technician => (
                        <option key={technician.employee_id} value={technician.employee_id}>
                        {technician.first_name} {technician.last_name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.reason} name="reason" placeholder="Reason..." required type="text" className="form-control" />
                    <label htmlFor="reason">Reason...</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
                <div className={successClasses}>
                    Congratulations! You've successfully made an appointment!
                </div>
                <div className={errorClasses}>
                    Something went wrong. Please confirm your VIN is composed of 17 characters.
                </div>
            </div>
            </div>
        </div>
    );
};
export default AppointmentForm;
