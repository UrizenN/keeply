import React ,{useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/home-page.js';
import LoginPage from './pages/login-page.js';
import WebFont from 'webfontloader';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Droid Sans', 'Chilanka','Silkscreen','Barlow']
          }
        });
       }, []);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);