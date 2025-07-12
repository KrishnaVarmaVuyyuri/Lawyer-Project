import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reception from './components/Reception/Reception';
import NavbarPage from './components/Navbar/NavbarPage';
import CheckRoomsPage from './components/CheckRooms/CheckRooms';
import RoomStatus from './components/RoomStatus/RoomStatus';
import BookingsPage from './components/BookingsPage/BookingsPage'
import CustomersPage from './components/CustomersPage/CustomersPage';
import Footer from './components/Footer/Footer';
import RoomsPage from './components/Rooms/Rooms';
import EmployeesPage from './components/EmployeePage/EmployeePage';
function App() {
  return (
    <Router>
      <NavbarPage/>
      <Routes>
        <Route path="/" element={<Reception />} />
        <Route path='/bookings' element={<BookingsPage/>} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/rooms" element={<RoomsPage/>}/>
        <Route path='/employees' element={<EmployeesPage/>}/>
        <Route path="/checking-rooms" element={<CheckRoomsPage/>}/>
        <Route path="/room-status" element={<RoomStatus/>}/>

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
