import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import TipoEventos from './Pages/TipoEventos/TipoEventos';
import EventosPage from './Pages/EventosPage/EventosPage';
import LoginPage from './Pages/LoginPage/LoginPage'
import TestePage from './Pages/TestePage/TestePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<HomePage />} path='/' exact />
                <Route element={<TipoEventos />} path='/tipo-eventos' />
                <Route element={<EventosPage />} path='/eventos' />
                <Route element={<LoginPage />} path='/login' />
                <Route element={<TestePage />} path='/testes' />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Rotas;