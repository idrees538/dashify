import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/dashboard';
import Analytics from './pages/analytics';
import Video from './pages/video';
import SocialMedia from './pages/social-media';
import CalendarPage from './pages/calendar';
import News from './pages/news';
import Recruitment from './pages/recruitment';
import Project from './pages/project';
import Activity from './pages/activity';
import Shared from './pages/shared';
import Privacy from './pages/privacy';
import Settings from './pages/settings';
import Help from './pages/help';
import Chat from './pages/chat';
import Credits from './pages/credits';
import Review from './pages/review';
import Deliverables from './pages/deliverables';

function App() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/video" element={<Video />} />
                <Route path="/social" element={<SocialMedia />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/schedule" element={<Navigate to="/calendar" replace />} />
                <Route path="/news" element={<News />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/project" element={<Project />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/review" element={<Review />} />
                <Route path="/deliverables" element={<Deliverables />} />
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
