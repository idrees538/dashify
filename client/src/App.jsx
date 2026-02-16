import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Schedule from './pages/Schedule';
import News from './pages/News';
import Recruitment from './pages/Recruitment';
import Project from './pages/Project';
import Activity from './pages/Activity';
import Shared from './pages/Shared';
import Privacy from './pages/Privacy';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Chat from './pages/Chat';

function App() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/news" element={<News />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/project" element={<Project />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/shared" element={<Shared />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/chat" element={<Chat />} />
            </Route>
        </Routes>
    );
}

export default App;
