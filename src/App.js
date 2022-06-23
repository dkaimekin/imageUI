import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes, useLocation } from "react-router";

import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

/* Custom components */
import Navigation from "./Components/Navigation";
import WallpaperCatalog from "./Components/Main/Catalog/WallpaperCatalog";
import Editor from "./Components/Main/Editor";
import LoadingScreen from "./Components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

function App() {
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {});
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/editor"
          element={
            <div>
              <Navigation selectedImage={selectedImage} />
              {selectedImage ? (
                <Editor selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              ) : (
                <Navigate to={"/catalog"} />
              )}
            </div>
          }
        ></Route>

        <Route
          exact
          path="/catalog"
          element={
            <div>
              <Navigation selectedImage={selectedImage} />
              <WallpaperCatalog loading={loading} setLoading={setLoading} setSelectedImage={setSelectedImage} />
            </div>
          }
        ></Route>
        <Route
          path="*"
          element={
            <div>
              <Navigate to={"/catalog"} />
            </div>
          }
        ></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
