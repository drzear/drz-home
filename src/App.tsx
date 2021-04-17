import React from "react";
import "./App.css";
import About from "./Components/Pages/About/About";
import Header from "./Components/Pieces/Header/Header";
import BiSamples from "./Components/Pages/BiSamples/BiSamples";
import CV from "./Components/Pages/CV/CV";
import Contact from "./Components/Pages/Contact/Contact";

function App() {
    return (
        <>      
            <Header />
            <CV />
            <About />
            <Contact />
        </>
    )
}

export default App;
