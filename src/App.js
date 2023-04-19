import Login from './pages/Login';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import LoginEmail from './pages/LoginEmail';
import Register from './pages/Register';


function App() {
  return (
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={ 
            <ProtectedRoute>
              <MainPage/>
            </ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/loginemail' element={<LoginEmail/>}/>
          <Route path='/register' element={<Register/>}/> 
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
