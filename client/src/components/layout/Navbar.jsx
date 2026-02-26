import { IoNotificationsOutline, IoSettingsOutline, IoMegaphoneOutline, IoMenuOutline, IoLogOutOutline } from 'react-icons/io5';
import { clearToken } from '../../services/api';

function Navbar() {
    const handleLogout = () => {
        clearToken();
        window.location.href = '/';
    };

    return (
        <nav className="hidden md:flex items-center justify-between h-12 p-0 pr-2 bg-transparent border-none sm:mb-2">
            <div className="ml-auto inline-flex items-center gap-2">
                <div className="relative md:hidden">
                    <button className="w-[30px] h-[30px] inline-flex items-center justify-center text-text-secondary rounded-md bg-bg-secondary border border-border-color hover:shadow-sm transition-shadow text-base" title="Menu">
                        <IoMenuOutline />
                    </button>
                </div>
                <div className="relative">
                    <button className="w-[30px] h-[30px] inline-flex items-center justify-center text-text-secondary rounded-md bg-bg-secondary border border-border-color hover:shadow-sm transition-shadow text-base" title="Notifications">
                        <IoNotificationsOutline />
                    </button>
                    <span className="absolute w-1.5 h-1.5 bg-accent rounded-full top-1 right-1 border border-bg-secondary" />
                </div>
                <div className="relative">
                    <button className="w-[30px] h-[30px] inline-flex items-center justify-center text-text-secondary rounded-md bg-bg-secondary border border-border-color hover:shadow-sm transition-shadow text-base" title="Settings">
                        <IoSettingsOutline />
                    </button>
                    <span className="absolute w-1.5 h-1.5 bg-accent rounded-full top-1 right-1 border border-bg-secondary" />
                </div>
                <div className="relative">
                    <button className="w-[30px] h-[30px] inline-flex items-center justify-center text-text-secondary rounded-md bg-bg-secondary border border-border-color hover:shadow-sm transition-shadow text-base" title="Announcements">
                        <IoMegaphoneOutline />
                    </button>
                    <span className="absolute w-1.5 h-1.5 bg-accent rounded-full top-1 right-1 border border-bg-secondary" />
                </div>

                <div className="w-[1px] h-[22px] bg-border-color mx-1.5 mr-0.5" />

                <div className="flex items-center">
                    <button
                        onClick={handleLogout}
                        className="h-[30px] px-3 inline-flex items-center gap-2 text-text-secondary rounded-md bg-bg-secondary border border-border-color hover:shadow-sm hover:text-accent transition-all text-[12px] font-medium"
                        title="Log out"
                    >
                        <IoLogOutOutline className="text-base" />
                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
