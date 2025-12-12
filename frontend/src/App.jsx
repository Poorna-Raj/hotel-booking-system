import { Routes, Route } from "react-router-dom";

import BookingList from "./Component/Booking-list/BookingList";
import AddBooking from "./Component/CRUD-booking/Add-booking/AddBooking";
import UpdateBooking from "./Component/CRUD-booking/Update-booking/UpdateBooking";
import DeleteBookingModal from "./Component/CRUD-booking/Delete-booking/Delete-booking";
import ViewBooking from "./page/ViewBooking/ViewBooking";
import RoomList from "./page/RoomList/RoomList";
import RoomDetails from "./page/RoomDetails/RoomDetails";

import Login from "./page/login/Login";
import Dashboard from "./page/Dashboard/Dashboard";
import UserManager from "./page/user_management/UserManager";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/user-manager" element={<UserManager />} />
        <Route path="/BookingList" element={<BookingList />} />
        <Route path="/AddBooking" element={<AddBooking />} />
        <Route path="/Updatebooking" element={<UpdateBooking />} />
        <Route path="/ViewBooking" element={<ViewBooking />} />
        <Route path="/Delete-booking" element={<DeleteBookingModal />} />
        <Route path="/RoomList" element={<RoomList />} />
        <Route path="/RoomDetails/:id" element={<RoomDetails />} />
      </Routes>
    </>
  );
}

export default App;
