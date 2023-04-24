import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelsList from './VehicleModelsList';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" >
            <Route index element={<ManufacturerList />}/>
            <Route path="new" element={<ManufacturerForm />}/>
          </Route>
          <Route path="models" >
            <Route index element={<VehicleModelsList />}/>
            <Route path="new" element={<VehicleModelForm />}/>
          </Route>
          <Route path="automobiles" >
            <Route index element={<AutomobileList />}/>
            <Route path="new" element={<AutomobileForm />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
