import {
    IoPersonOutline,
    IoMailOutline,
    IoShieldCheckmarkOutline,
    IoLogOutOutline,
    IoSunnyOutline,
    IoMoonOutline,
} from 'react-icons/io5';
import { useTheme } from '../../contexts/ThemeContext';
// Settings.css removed as part of Tailwind migration

function Settings() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Settings</h1>
                <p className="text-[15px] text-text-secondary font-normal">Manage your account preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="bg-bg-secondary rounded-xl p-[18px] flex items-center gap-4 shadow-sm border border-border-color mb-8">
                <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center text-2xl">
                    <IoPersonOutline />
                </div>
                <div className="flex-1">
                    <h2 className="text-base font-semibold text-text-primary">John Doe</h2>
                    <p className="text-sm text-text-secondary">Pro Creator</p>
                </div>
            </div>

            {/* Settings Rows */}
            <div className="flex flex-col gap-4 mb-8">
                <h3 className="text-sm font-semibold text-text-primary/60 uppercase tracking-wider mb-2">Account Information</h3>

                <div className="flex items-center justify-between bg-bg-secondary rounded-xl p-[18px] shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-blue-500/10 text-blue-500">
                            <IoMailOutline />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-secondary">Email Address</p>
                            <p className="text-sm font-semibold text-text-primary">john.doe@example.com</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-bg-secondary rounded-xl p-[18px] shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-[#10B981]/10 text-[#10B981]">
                            <IoShieldCheckmarkOutline />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-secondary">Account Status</p>
                            <p className="text-sm font-semibold text-text-primary">
                                <span className="bg-[#10B981]/10 text-[#10B981] px-2.5 py-1 rounded-md text-[13px] font-semibold">Active</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <h3 className="text-sm font-semibold text-text-primary/60 uppercase tracking-wider mb-2">Appearance</h3>

                <div className="flex items-center justify-between bg-bg-secondary rounded-xl p-[18px] shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-accent-light text-accent">
                            {theme === 'dark' ? <IoMoonOutline /> : <IoSunnyOutline />}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-secondary">Theme</p>
                            <p className="text-sm font-semibold text-text-primary">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                        </div>
                    </div>
                    <button className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${theme === 'dark' ? 'bg-accent' : 'bg-black/10 dark:bg-white/10'}`} onClick={toggleTheme}>
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <h3 className="text-sm font-semibold text-text-primary/60 uppercase tracking-wider mb-2">Actions</h3>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#EF4444]/10 text-[#EF4444] rounded-xl font-semibold border border-[#EF4444]/20 hover:bg-[#EF4444]/20 transition-all self-start">
                    <IoLogOutOutline /> Logout
                </button>
            </div>
        </div>
    );
}

export default Settings;
