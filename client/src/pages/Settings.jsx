import {
    IoPersonOutline,
    IoMailOutline,
    IoShieldCheckmarkOutline,
    IoLogOutOutline,
    IoSunnyOutline,
    IoMoonOutline,
} from 'react-icons/io5';
import { useTheme } from '../contexts/ThemeContext';

function Settings() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Settings</h1>
                <p className="text-[15px] text-secondary-text font-normal">Manage your account preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="card-base flex items-center gap-5 p-5 mb-8">
                <div className="w-14 h-14 rounded-full bg-[#8204ff1f] text-accent flex items-center justify-center text-3xl">
                    <IoPersonOutline />
                </div>
                <div>
                    <h2 className="text-[18px] font-bold text-primary-text">John Doe</h2>
                    <p className="text-[13px] text-secondary-text">Pro Creator</p>
                </div>
            </div>

            {/* Settings Rows */}
            <div className="mb-8">
                <h3 className="text-[13px] font-semibold text-secondary-text uppercase tracking-[1px] mb-4 pl-1">Account Information</h3>

                <div className="card-base flex items-center justify-between p-5 mb-3 last:mb-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#3b82f61f] text-[#3b82f6] flex items-center justify-center text-xl">
                            <IoMailOutline />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-secondary-text">Email Address</p>
                            <p className="text-[15px] font-semibold text-primary-text mt-0.5">john.doe@example.com</p>
                        </div>
                    </div>
                </div>

                <div className="card-base flex items-center justify-between p-5 mb-3 last:mb-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#10b9811f] text-[#10b981] flex items-center justify-center text-xl">
                            <IoShieldCheckmarkOutline />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-secondary-text">Account Status</p>
                            <div className="mt-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[13px] font-semibold bg-[#10b98126] text-[#10b981] border border-[#10b9814d]">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-[13px] font-semibold text-secondary-text uppercase tracking-[1px] mb-4 pl-1">Appearance</h3>

                <div className="card-base flex items-center justify-between p-5 mb-3 last:mb-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#8204ff1f] text-accent flex items-center justify-center text-xl">
                            {theme === 'dark' ? <IoMoonOutline /> : <IoSunnyOutline />}
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-secondary-text">Theme</p>
                            <p className="text-[15px] font-semibold text-primary-text mt-0.5">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                        </div>
                    </div>
                    <button className="cursor-pointer" onClick={toggleTheme}>
                        <div className={`w-11 h-6 rounded-xl relative transition-colors duration-200 ${theme === 'dark' ? 'bg-[#10b981]' : 'bg-[#1a1a2e14] dark:bg-white/10'}`}>
                            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-200 shadow-sm ${theme === 'dark' ? 'left-[22px]' : 'left-0.5'}`} />
                        </div>
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-[13px] font-semibold text-secondary-text uppercase tracking-[1px] mb-4 pl-1">Actions</h3>
                <button className="flex items-center gap-2 text-[#ef4444] font-medium px-4 py-2 hover:bg-[#ef44440a] rounded-lg transition-colors">
                    <IoLogOutOutline className="text-xl" /> Logout
                </button>
            </div>
        </div>
    );
}

export default Settings;
