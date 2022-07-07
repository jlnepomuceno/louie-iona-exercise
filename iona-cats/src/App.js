/**
 * @author John Louie Nepomuceno
 * @version 0.0.1
 * @purpose IONA Application
 * @function Database of cats and their properties
 */

import React, {useState, useContext, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes
} from "react-router-dom";

import Home from "./components/Home";
import Cat from "./components/Cat";

export default function App() {
  useEffect(() => {
    document.title = "Cat Browser"
    console.log("App is loading");
  }, []);

  let data = "";

  let routes = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: `/${data}`,
      element: <Cat />
    }
  ]);
  console.log("Routes defined")
  return routes;
}

// export default function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cat-details" element={<Cat />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }
