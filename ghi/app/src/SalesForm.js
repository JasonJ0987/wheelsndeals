import React, { useEffect, useState } from 'react';


function SalesForm() {
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: '',
        customer: '',
        price:'',
    });

    const [auto, setAuto] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [isCreated, setIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({...formData,[inputName]: value});
    };

    const fetchAuto = async () => {
        const autoUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(autoUrl);
        if (response.ok) {
            const data = await response.json();
            setAuto(data.autos);
        }
    };

    const fetchEmployees = async () => {
        const employeeUrl = "http://localhost:8090/api/salespeople/";
        const response = await fetch(employeeUrl);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };


    const fetchCustomers = async () => {
        const customerUrl = "http://localhost:8090/api/customers/";
        const response = await fetch(customerUrl);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };


    useEffect(() => {
        fetchAuto();
    }, []);
    useEffect(() => {
        fetchEmployees();
    }, []);
    useEffect(() => {
        fetchCustomers();
    }, []);


    const handleSubmit = async (event) =>{
        event.preventDefault();
        const autoVin = formData.automobile
        const salesUrl = 'http://localhost:8090/api/sales/';
        const autoUrl = `http://localhost:8100/api/automobiles/${autoVin}/`;
        const fetchConfig = {
            method:"post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const currentAuto = auto.filter(car => (
            car.vin === autoVin
        ))[0];
        const fetchAutoConfig = {
            method:"put",
            body: JSON.stringify({
                "color": currentAuto.color,
                "year": currentAuto.year,
                "sold": true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const autoResponse = await fetch(autoUrl, fetchAutoConfig);
            if (autoResponse.ok) {
                setFormData({
                    automobile: '',
                    salesperson: '',
                    customer: '',
                    price:'',
                });
                setIsCreated(true);

            };
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
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} className={formClasses}>
                <div className="mb-3">
                <label htmlFor="automobile">Choose a car</label>
                <select onChange={handleFormChange} value={formData.automobile} required name="automobile" className="form-select">
                    <option value="">Choose a car...</option>
                    {auto.filter(car => car.sold === false).map(car => (
                    <option key={car.vin} value={car.vin}>
                        {car.vin}
                    </option>
                    ))}
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="salesperson">Choose a salesperson</label>
                <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" className="form-select">
                    <option value="">Choose a salesperson...</option>
                        {salespeople.map(salesperson => (
                            <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                        ))}
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="customer">Choose a customer</label>
                <select onChange={handleFormChange} value={formData.customer} required name="customer" className="form-select">
                    <option value="">Choose a customer...</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.first_name} {customer.last_name}
                        </option>
                    ))}
                </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.price} placeholder="Price..." required type="number" name="price" className="form-control" />
                    <label htmlFor="price">Price...</label>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
            <div className={successClasses}>
                Congratulations on your sale!
            </div>
            <div className={errorClasses}>
                Something went wrong. Please confirm your VIN.
            </div>
            </div>
        </div>
        </div>
    );
};

export default SalesForm;
