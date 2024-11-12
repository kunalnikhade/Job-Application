import { Routes, Route } from 'react-router-dom'; 
import Home from './Components/Home';
import Login from './Components/Login';
import Jobs from './Components/Jobs';
import NotFound from './Components/NotFound';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtecteddRoute';
import JobCardsDetails from './Components/JobCardsDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component = {Home}/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Jobs" element={<ProtectedRoute Component = {Jobs}/>} />
      <Route path="/Jobs/:id" element={<ProtectedRoute Component = {JobCardsDetails}/>} />
      <Route path="/Profile" element={<ProtectedRoute Component = {Profile}/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
