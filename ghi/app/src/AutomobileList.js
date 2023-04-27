import React, { useEffect, useState } from 'react';

function AutomobileList() {

    const [autos, setAutos] = useState([]);
    const [del, setDel] = useState(null);

    const loadAutos = async() => {
        const url = "http://localhost:8100/api/automobiles/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    };
    useEffect(() => {
        loadAutos();
    }, []);

    const handleConfirmDelete = async (event, automobileVin) => {
        event.preventDefault();
        const url = `http://localhost:8100/api/automobiles/${automobileVin}/`;

        const fetchConfig = {
            method: "DELETE",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setAutos(autos.filter(auto => auto.vin !== automobileVin));
        }
    };

    const handleCancelDelete = () => { setDel(null) };
    const handleDelete = (automobileVin) => { setDel(automobileVin) };

    return (
        <div className='container'>
        <h1 className="mt-4">Automobiles</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {autos.map(automobile => (
                    <tr key={automobile.vin}>
                        <td>
                            {automobile.vin}
                        </td>
                        <td>
                            {automobile.color}
                        </td>
                        <td>
                            {automobile.year}
                        </td>
                        <td>
                            {automobile.model.name}
                        </td>
                        <td>
                            {automobile.model.manufacturer.name}
                        </td>
                        <td>
                            {(automobile.sold)? ("Yes"):("No")}
                        </td>
                        <td>
                        {(del === automobile.vin) ? (
                            <div className="d-grid gap-2">
                                <button onClick={(event) => handleConfirmDelete(event, automobile.vin)} className="btn btn-outline-danger btn-sm" type="button">Confirm Delete</button>
                                <button onClick={() => handleCancelDelete()} className="btn btn-outline-danger btn-sm" type="button">Cancel Delete</button>
                            </div>
                        ) : (
                            <button onClick={() => handleDelete(automobile.vin)} className="btn btn-outline-danger btn-sm">Delete</button>
                        )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default AutomobileList;
