import React, { useEffect, useState } from 'react';

function ManufacturerList() {

    const [manus, setManus] = useState([]);

    const loadManus = async() =>{
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManus(data.manufacturers)
        };
    };
    useEffect(() => {
        loadManus();
    }, []);

    return (
        <div className='container'>
        <h1>Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {manus.map(manufacturer => (
                    <tr key={manufacturer.id}>
                        <td>
                            {manufacturer.name}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default ManufacturerList
