import Login from './pages/Login';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={ 
            <ProtectedRoute>
              <MainPage/>
            </ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
