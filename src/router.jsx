import App from './pages/app';
import Contato from './pages/contato';
import Notfound from './pages/notfound';
import Eventos from './pages/eventos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Teste from './pages/teste';


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/contato' element={<Contato />} />
                <Route path='/teste' element={< Teste/>} />
                <Route path='/eventos' element={<Eventos/>}/>




                <Route path='*' element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    );
}

