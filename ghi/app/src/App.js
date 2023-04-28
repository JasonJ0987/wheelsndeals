import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelsList from './VehicleModelsList';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import SalespersonForm from './SalespersonForm';
import SalespersonList from './SalespersonList';
import CustomersList from './CustomersList';
import CustomersForm from './CustomersForm';
import SalesForm from './SalesForm';
import SalesList from './SalesList';
import SalespersonHistory from './SalespersonHistory';


function App() {
    return (
    <BrowserRouter>
        <Nav />
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="manufacturers" >
                    <Route index element={<ManufacturerList />} />
                    <Route path="new" element={<ManufacturerForm />} />
                </Route>
                <Route path="models" >
                    <Route index element={<VehicleModelsList />} />
                    <Route path="new" element={<VehicleModelForm />} />
                </Route>
                <Route path="automobiles" >
                    <Route index element={<AutomobileList />} />
                    <Route path="new" element={<AutomobileForm />} />
                </Route>
                <Route path="technicians" >
                    <Route index element={<TechnicianList />} />
                    <Route path="new" element={<TechnicianForm />} />
                </Route>
                <Route path="appointments" >
                    <Route index element={<AppointmentList />} />
                    <Route path="new" element={<AppointmentForm />} />
                    <Route path="history" element={<ServiceHistory />} />
                </Route>
                <Route path="salesperson" >
                    <Route index element={<SalespersonList />}/>
                    <Route path="new" element={<SalespersonForm />}/>
                    <Route path="history" element={<SalespersonHistory/>} />
                </Route>
                <Route path="customers" >
                    <Route index element={<CustomersList />}/>
                    <Route path="new" element={<CustomersForm />}/>
                </Route>
                <Route path="sales" >
                    <Route index element={<SalesList/>}/>
                    <Route path="new" element={<SalesForm />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
