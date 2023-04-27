import React, { useState, useEffect } from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);
    const [appointmentsByVin, setAppointmentsByVin] = useState(appointments);
    const [vin, setVin] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    const loadAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    };
    useEffect(() => {loadAppointments();}, []);

    const loadAutomobiles = async () => {
        const response = await fetch('http://localhost:8080/api/automobiles_vo');
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.automobiles);
        }
    };
    useEffect(() => {loadAutomobiles();}, []);

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setAppointmentsByVin(appointments.filter(appointment => appointment.vin===vin));
        setIsSearch(true);
    };

    const handleClickAllServiceHistory = () => {
        setIsSearch(false);
        setVin("");
    }

    let wholeClasses = "";
    let filteredClasses = "d-none";
    if (isSearch) {
        wholeClasses = "d-none";
        filteredClasses = "";
    }

    return (
      <div className='container'>
        <h1 className="mt-4">Service History</h1>
        <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
                <div className="form-floating col-md-8">
                    <input onChange={handleVinChange} value={vin} name="vin" placeholder="Search by VIN..." required type="text" className="form-control" />
                    <label htmlFor="vin">Search by VIN...</label>
                </div>
                <button className="btn btn-outline-secondary">Search</button>
            </div>
        </form>
        <button onClick={handleClickAllServiceHistory} className="btn btn-outline-secondary">All Service History</button>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody className={wholeClasses}>
                {appointments.map(appointment => (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>
                            {(automobiles.some(automobile => automobile.vin === appointment.vin))? "YES": "No"}
                        </td>
                        <td>{appointment.customer}</td>
                        <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                        <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.status}</td>
                    </tr>
                ))}
            </tbody>
            <tbody className={filteredClasses}>
                {appointmentsByVin.map(appointment => (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>
                            {(automobiles.some(automobile => automobile.vin === appointment.vin))? "YES": "No"}
                        </td>
                        <td>{appointment.customer}</td>
                        <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                        <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    );
};
export default ServiceHistory;
