import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-layout__content">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
