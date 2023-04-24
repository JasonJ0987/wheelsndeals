import React, { useState, useEffect } from 'react';

function VehicleModelForm() {
    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer: '',
    });
    const [manufacturers, setManufacturers] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    const fetchManufacturers = async () => {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }
    useEffect(() => {fetchManufacturers();}, []);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({...formData ,[inputName]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/models/';
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
                name: '',
                picture_url: '',
                manufacturer: '',
            });
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
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleSubmit} className={formClasses}>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.name} placeholder="Model name..." required type="text" name="name" className="form-control" />
                <label htmlFor="name">Model name...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL..." required type="url" name="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture URL...</label>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} value={formData.manufacturer} required name="manufacturer" className="form-select">
                  <option value="">Choose a manufacturer...</option>
                  {manufacturers.map(manufacturer => (
                    <option key={manufacturer.name} value={manufacturer.name}>
                        {manufacturer.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className={successClasses}>
                Congratulations! You've created a new vehicle model!
            </div>
          </div>
        </div>
      </div>
    );
}
export default VehicleModelForm