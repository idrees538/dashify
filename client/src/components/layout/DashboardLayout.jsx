import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function DashboardLayout() {
    return (
        <div className="flex h-screen w-full overflow-hidden max-md:flex-col">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8 max-lg:p-6 max-md:p-4 max-md:pt-5 bg-primary-bg transition-[margin-left,background] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
