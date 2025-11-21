import { Routes, Route } from "react-router-dom";

import AddBooking from "./Component/CRUD-booking/Add-booking/AddBooking";

function App() {
  return (
    <>
      <Routes>
       
        <Route path="/AddBooking" element={<AddBooking />} />
        
      </Routes>
    </>
  );
}

export default App;