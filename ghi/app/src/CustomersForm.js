import React, { useState } from 'react';

function CustomersForm(){
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number:'',
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
        const url = 'http://localhost:8090/api/customers/';
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
                address: '',
                phone_number:'',
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
            <h1>Please fill in your information!</h1>
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
                <input onChange={handleFormChange} value={formData.address} placeholder="Address..." required type="text" name="address" className="form-control" />
                <label htmlFor="address">Address...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.phone_number} placeholder="Phone number..." required type="text" name="phone_number" className="form-control" />
                <label htmlFor="phone_number">Phone number...</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className={successClasses}>
                Congratulations! Welcome to the CarCar Family!
            </div>
            <div className={errorClasses}>
                Something went wrong. Please confirm your phone number.
            </div>
          </div>
        </div>
      </div>
    );
};

export default CustomersForm;
