import { NavLink } from 'react-router-dom';
import './index.css'

function Nav() {
    return(
        <nav id="navcolor" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Wheels N' Deals</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
                <li class="nav-item dropdown">
                    <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Inventory
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="/manufacturers">Manufacturers</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="/manufacturers/new">Create a Manufacturer</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="/models">Models</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="/models/new">Create a Model</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="/automobiles">Automobiles</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="/automobiles/new">Create an Automobile</NavLink>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Sales
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="salesperson">Salespeople</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="salesperson/new">Add a Salesperson</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="customers">Customers</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="customers/new">Add a Customer</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="sales">Sales</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="sales/new">Record a Sale</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" aria-current="page" to="salesperson/history">Sales History</NavLink>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Service
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" aria-current="page" to="/technicians">Technicians</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" aria-current="page" to="/technicians/new">Add a Technician</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" aria-current="page" to="/appointments">Service Appointments</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" aria-current="page" to="/appointments/new">Create a Service Appointment</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" aria-current="page" to="/appointments/history">Service History</NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
            
            </div>
        </div>
        </nav>
    );
};

export default Nav;
