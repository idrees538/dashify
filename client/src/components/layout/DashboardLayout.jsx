import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-layout__content">
                <Navbar />
                <div className="dashboard-layout__main">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;
