import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Layout from "./Layout/Layout";
import { Notification } from "./Utils/Notification/Notification";
import ScrollToTop from "./Utils/ScrollToTop";

function App() {
  return (
    <>
      <Notification />

      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
