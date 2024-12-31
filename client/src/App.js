import React, { useContext, useEffect, } from 'react';
import { useLocation, redirect, } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider, } from '@mui/material'; // Import MUI components
import userContext from './context/userContext/userContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import configServ from './services/config';
import Alert from './components/Alert';
import theme from './themes/theme';
import { SidebarProvider } from "./context/SidebarContext"
import MainContent from './layout/main';



function App() {
    const location = useLocation();
    const { setUser } = useContext(userContext);
    // const navigate = useNavigate();
    const token = Cookies.get('authToken');
    let decodedToken;





    const getAdmin = async (id) => {
        const admin = await configServ.getAdminById(id);
        setUser(admin);
    };

    useEffect(() => {
        if (token) {
            decodedToken = jwtDecode(token);
            getAdmin(decodedToken.id);
        } else {
            // navigate('/login'); 
        }
    }, [location.pathname]);




    return (
        <ThemeProvider theme={theme}>
            <SidebarProvider>
                <CssBaseline />
                <Alert />
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                    {location.pathname !== '/login' && <Header />}
                    {location.pathname !== '/login' && <Sidebar />}
                    <MainContent />
                </Box>

            </SidebarProvider>

        </ThemeProvider>
    );
}

export default App;

export const AppLoader = () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        return redirect('/login')
    }
    return null;
};




