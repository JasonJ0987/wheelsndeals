import React, { useState, useEffect } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);

    const loadAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments.filter(
                appointment => appointment.status==="created"));
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

    const handleCancel = async (event, appointmentId) => {
        event.preventDefault();
        const url = `http://localhost:8080/api/appointments/${appointmentId}/cancel`;
        const fetchConfig = {
            method: "PUT",
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setAppointments(appointments.filter(
                appointment => appointment.id !== appointmentId));
        }
    };

    const handleFinish = async (event, appointmentId) => {
        event.preventDefault();
        const url = `http://localhost:8080/api/appointments/${appointmentId}/finish`;
        const fetchConfig = {
            method: "PUT",
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setAppointments(appointments.filter(
                appointment => appointment.id !== appointmentId));
        }
    };

    return (
        <div className='container'>
        <h1>Service Appointments</h1>
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
                </tr>
            </thead>
            <tbody>
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
                        <td>
                            <button onClick={(event) => handleCancel(event, appointment.id)} className="btn btn-outline-danger btn-sm" type="button">Cancel</button>
                            <button onClick={(event) => handleFinish(event, appointment.id)} className="btn btn-outline-success btn-sm" type="button">Finish</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};
export default AppointmentList;
