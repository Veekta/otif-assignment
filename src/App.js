import React from "react";
import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Private from "./Components/PrivateRoute";
import Signin from "./Components/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <HomePage />
            </Private>
          }
        />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
