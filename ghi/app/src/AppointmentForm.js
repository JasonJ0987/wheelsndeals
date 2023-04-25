import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [technician, setTechnician] = useState("");
    const [reason, setReason] = useState("");

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }
    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const [technicians, setTechnicians] = useState([]);
    const fetchTechnicians = async ()=> {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }
    useEffect(() => {fetchTechnicians();}, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = `${date} ${time}`;
        data.technician = technician;
        data.reason = reason;

        const url = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json', },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setVin("");
            setCustomer("");
            setDate("");
            setTime("");
            setTechnician("");
            setReason("");
        }
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a service appointment</h1>
            <form onSubmit={handleSubmit} >
              <div className="form-floating mb-3">
                <input onChange={handleVinChange} value={vin} name="vin" placeholder="Automobile VIN..." required type="text" className="form-control" />
                <label htmlFor="vin">Automobile VIN...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCustomerChange} value={customer} name="customer" placeholder="Customer..." required type="text" className="form-control" />
                <label htmlFor="customer">Customer...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleDateChange} value={date} name="date" placeholder="Date..." required type="date" className="form-control" />
                <label htmlFor="date">Date...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTimeChange} value={time} name="time" placeholder="Time..." required type="time" className="form-control" />
                <label htmlFor="time">Time...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleReasonChange} value={reason} name="reason" placeholder="Reason..." required type="text" className="form-control" />
                <label htmlFor="reason">Reason...</label>
              </div>
              <div className="mb-3">
                <select required onChange={handleTechnicianChange} value={technician} name="technician" className="form-select">
                  <option value="">Choose a technician...</option>
                  {technicians.map(technician => (
                    <option key={technician.employee_id} value={technician.employee_id}>
                        {technician.first_name} {technician.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default AppointmentForm