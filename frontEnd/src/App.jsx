import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import ChatPage from './Pages/ChatPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/loginPage';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import VerifyPage from './Pages/VerifyPage';
import { AppContainer } from './Utils/Styles/Global.style';

function App() {
  return (
    <AppContainer>
      <Navbar />
      
      <Routes>
        <Route path='/login' exact element={<LoginPage />}/>
        <Route path='/register' exact element={<RegisterPage />}/>
        <Route path='/user/verify-email' exact element={<VerifyPage />}/>

        <Route element={<ProtectedRoute />}>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/profile' exact element={<ProfilePage />}/>
          <Route path='/chat' exact element={<ChatPage />}/>
        </Route>
      </Routes>
    </AppContainer>
  )
}

export default App
