import { Routes, Route } from "react-router-dom";

import AddBooking from "./Component/CRUD-booking/Add-booking/AddBooking";
import UpdateBooking from "./Component/CRUD-booking/Update-booking/Updatebooking";  
import ViewBooking from "./Component/CRUD-booking/View-booking/Viewbooking";
import DeleteBookingModal from "./Component/CRUD-booking/Delete-booking/Delete-booking";

function App() {
  return (
    <>
      <Routes>
       
        <Route path="/AddBooking" element={<AddBooking />} />
        <Route path="/Updatebooking" element={<UpdateBooking />} />
        <Route path="/Viewbooking" element={<ViewBooking />} />
        <Route path="/Delete-booking" element={<DeleteBookingModal />} />
       
        
      </Routes>
    </>
  );
}

export default App;