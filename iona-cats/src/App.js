/**
 * @author John Louie Nepomuceno
 * @version 0.0.1
 * @purpose IONA Application
 * @function Database of cats and their properties
 */

import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./components/Home";
import Cat from "./components/Cat";

export default function App() {
  React.useEffect(() => {
    document.title = "Cat Browser";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:cat_image_id" element={<Cat />} />
    </Routes>
  )
};
