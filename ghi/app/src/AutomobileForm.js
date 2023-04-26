import React, { useState, useEffect } from 'react';

function AutomobileForm() {
    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: '',
    });
    const [models, setModels] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchModels = async () => {
        const response = await fetch("http://localhost:8100/api/models/");
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    };
    useEffect(() => {fetchModels();}, []);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({...formData ,[inputName]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
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
                vin: '',
                model_id: '',
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
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={handleSubmit} className={formClasses}>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.color} placeholder="Color..." required type="text" name="color" className="form-control" />
                <label htmlFor="name">Color...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.year} placeholder="Year..." required type="number" name="year" className="form-control" />
                <label htmlFor="year">Year...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.vin} placeholder="VIN..." required type="text" name="vin" className="form-control" />
                <label htmlFor="vin">VIN...</label>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} value={formData.model_id} required name="model_id" className="form-select">
                  <option value="">Choose a model...</option>
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                        {model.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className={successClasses}>
                Congratulations! You've added a new automobile!
            </div>
            <div className={errorClasses}>
                Something went wrong. Please confirm your VIN.
            </div>
          </div>
        </div>
      </div>
    );
};
export default AutomobileForm;
