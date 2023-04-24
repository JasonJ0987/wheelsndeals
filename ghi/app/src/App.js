import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListManufacturers from './ListManufacturers';
import ManufacturerForm from './ManufacturerForm';
import ListAutomobile from './ListAutomobile';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" >
            <Route index element={<ListManufacturers />}/>
            <Route path="new" element={<ManufacturerForm />}/>
          </Route>
          <Route path="automobiles" >
            <Route index element={<ListAutomobile />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
