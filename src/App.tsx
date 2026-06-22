import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Protocols from './pages/Protocols';
import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/dashboard/:address" element={<Dashboard />} />
      <Route path="/profile/:address" element={<Profile />} />
      <Route path="/protocols" element={<Protocols />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
