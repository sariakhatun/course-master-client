import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import Background from '../components/Background/Background';
import DynamicBackground from '../components/Background/DynamicBackground';
import { ThemeProvider } from '../context/ThemeContext';
import ScrollToTopButton from '../components/ScrollToTopButton';

const RootLayout = () => {
    return (
        <ThemeProvider>
             <DynamicBackground>
            <div className="min-h-screen flex flex-col">
                
                
            
             
                <Navbar/>

            {/* This will grow and push the footer to the bottom */}
            <div className="flex-grow">
                <Outlet />
            </div>

            <Footer />
            <ScrollToTopButton></ScrollToTopButton>
        </div>
        </DynamicBackground>
        </ThemeProvider>
       
        
    );
};

export default RootLayout;
