import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoEyeOffOutline } from 'react-icons/io5';

function Privacy() {
    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Privacy</h1>
                <p className="text-[15px] text-text-secondary font-normal">Manage your privacy settings and data controls.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xl text-emerald-500 mb-4">
                        <IoShieldCheckmarkOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Security Score</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-text-primary">92%</h2>
                        <span className="text-xs font-bold text-emerald-500">Strong</span>
                    </div>
                </div>
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-xl text-blue-500 mb-4">
                        <IoLockClosedOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">2FA Status</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-text-primary">Active</h2>
                        <span className="text-xs font-bold text-emerald-500">Enabled</span>
                    </div>
                </div>
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-xl text-[#A855F7] mb-4">
                        <IoEyeOffOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Data Sharing</p>
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold text-text-primary">Limited</h2>
                        <span className="text-[13px] text-text-secondary">Minimal data shared</span>
                    </div>
                </div>
            </div>

            <div className="bg-bg-secondary rounded-xl shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Privacy Controls</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {['Profile Visibility', 'Activity Status', 'Read Receipts', 'Data Analytics', 'Third-party Access'].map((item, i) => (
                        <div className="flex items-center justify-between p-4 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <span className="font-semibold text-text-primary">{item}</span>
                            <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${i < 3 ? 'bg-emerald-500' : 'bg-bg-hover'}`}>
                                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-all duration-200 ${i < 3 ? 'left-[22px]' : 'left-0.5'}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Privacy;
