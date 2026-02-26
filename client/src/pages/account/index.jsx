import { IoPersonOutline, IoMailOutline, IoShieldCheckmarkOutline, IoPencilOutline } from 'react-icons/io5';

function Account() {
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Account</h1>
                <p className="text-[12px] text-text-secondary">Update your profile and manage account security.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Profile Section */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                    <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider">User Profile</h3>
                    <div className="bg-bg-secondary rounded-xl p-6 border border-border-color shadow-sm flex flex-col items-center text-center gap-4 group">
                        <div className="relative w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-4xl text-accent border border-accent/20 group-hover:scale-105 transition-transform duration-300">
                            <IoPersonOutline />
                            <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white dark:bg-bg-card border border-border-color shadow-lg flex items-center justify-center text-sm text-text-secondary hover:text-accent transition-colors">
                                <IoPencilOutline />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-bold text-text-primary">John Doe</h2>
                            <p className="text-[12px] font-medium text-text-secondary uppercase tracking-widest bg-bg-hover px-2 py-0.5 rounded-full">Pro Creator</p>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                    <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider">Security & Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-bg-secondary rounded-xl p-5 border border-border-color shadow-sm hover:border-accent/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl">
                                    <IoMailOutline />
                                </div>
                                <h4 className="text-sm font-semibold text-text-primary">Email Address</h4>
                            </div>
                            <p className="text-[14px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">john.doe@example.com</p>
                            <button className="mt-4 text-[11px] font-bold text-accent uppercase tracking-wider hover:underline">Change Email</button>
                        </div>

                        <div className="bg-bg-secondary rounded-xl p-5 border border-border-color shadow-sm hover:border-accent/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl">
                                    <IoShieldCheckmarkOutline />
                                </div>
                                <h4 className="text-sm font-semibold text-text-primary">Password</h4>
                            </div>
                            <p className="text-[14px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">••••••••••••</p>
                            <button className="mt-4 text-[11px] font-bold text-accent uppercase tracking-wider hover:underline">Reset Password</button>
                        </div>
                    </div>

                    <div className="bg-bg-secondary rounded-xl p-6 border border-border-color shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="text-sm font-semibold text-text-primary">Two-Factor Authentication</h4>
                                <p className="text-[12px] text-text-secondary mt-1">Add an extra layer of security to your account.</p>
                            </div>
                            <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">Enable</button>
                        </div>
                        <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                            <p className="text-[11px] font-medium text-yellow-600 dark:text-yellow-500 flex items-center gap-2 italic">
                                <span>⚠️</span>
                                Recommended for all creator accounts
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
