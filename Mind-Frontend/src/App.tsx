import { Dashboard } from './Dashboard';
import { SignIn } from './signin';
import { SignUp } from './signup';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProctectedRoutes'; 
import { PublicBrainView } from './Componet/UI/PublicView';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/signin" replace />} />
                <Route 
                    path='/dashboard' 
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    } 
                />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/brain/:shareLink' element={<PublicBrainView/>} />
                <Route path='*' element={<Navigate to="/signin" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;