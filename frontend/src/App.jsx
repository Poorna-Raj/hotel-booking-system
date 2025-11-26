import { Routes, Route } from "react-router-dom";

import BookingList from "./Component/Booking-list/BookingList";
import AddBooking from "./Component/CRUD-booking/Add-booking/AddBooking";
import UpdateBooking from "./Component/CRUD-booking/Update-booking/UpdateBooking";
import ViewBooking from "./Component/CRUD-booking/View-booking/ViewBooking";
import DeleteBookingModal from "./Component/CRUD-booking/Delete-booking/Delete-booking";
import Login from "./page/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/BookingList" element={<BookingList />} />
        <Route path="/AddBooking" element={<AddBooking />} />
        <Route path="/Updatebooking" element={<UpdateBooking />} />
        <Route path="/Viewbooking" element={<ViewBooking />} />
        <Route path="/Delete-booking" element={<DeleteBookingModal />} />
      </Routes>
    </>
  );
}

export default App;
