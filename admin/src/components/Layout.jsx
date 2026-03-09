import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    IoGridOutline,
    IoPeopleOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoCardOutline,
    IoLogOutOutline,
    IoShieldCheckmarkOutline,
} from 'react-icons/io5';

const NAV_ITEMS = [
    { to: '/', icon: IoGridOutline, label: 'Dashboard' },
    { to: '/users', icon: IoPeopleOutline, label: 'Users' },
    { to: '/bookings', icon: IoCalendarOutline, label: 'Bookings' },
    { to: '/credits', icon: IoCashOutline, label: 'Credits' },
    { to: '/subscriptions', icon: IoCardOutline, label: 'Subscriptions' },
];

function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-bg-primary">
            {/* Sidebar */}
            <aside className="w-[240px] bg-bg-secondary border-r border-border-color flex flex-col fixed h-screen">
                <div className="p-5 border-b border-border-color">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                            <IoShieldCheckmarkOutline className="text-white text-lg" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-text-primary tracking-wide">Dashify</h1>
                            <p className="text-[10px] text-accent font-semibold uppercase tracking-widest">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-accent/10 text-accent border border-accent/20'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                                }`
                            }
                        >
                            <item.icon className="text-lg" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-3 border-t border-border-color">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">{user?.name}</p>
                            <p className="text-[10px] text-text-secondary truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-danger hover:bg-danger/10 transition-all"
                    >
                        <IoLogOutOutline className="text-lg" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-[240px] p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
