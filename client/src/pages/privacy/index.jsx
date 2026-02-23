import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoEyeOffOutline } from 'react-icons/io5';

function Privacy() {
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Privacy</h1>
                <p className="text-[12px] text-text-secondary">Manage your privacy settings and data controls.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-lg text-emerald-500 mb-3">
                        <IoShieldCheckmarkOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Security Score</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-xl font-bold text-text-primary">92%</h2>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Strong</span>
                    </div>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-lg text-blue-500 mb-3">
                        <IoLockClosedOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">2FA Status</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-xl font-bold text-text-primary">Active</h2>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Enabled</span>
                    </div>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-lg text-[#A855F7] mb-3">
                        <IoEyeOffOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Data Sharing</p>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-text-primary">Limited</h2>
                        <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wide">Minimal data shared</span>
                    </div>
                </div>
            </div>

            <div className="bg-bg-secondary rounded-lg shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Privacy Controls</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {['Profile Visibility', 'Activity Status', 'Read Receipts', 'Data Analytics', 'Third-party Access'].map((item, i) => (
                        <div className="flex items-center justify-between p-4 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <span className="text-sm font-semibold text-text-primary">{item}</span>
                            <div className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors ${i < 3 ? 'bg-emerald-500' : 'bg-bg-hover'}`}>
                                <div className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.5 shadow-sm transition-all duration-200 ${i < 3 ? 'left-[20px]' : 'left-0.5'}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Privacy;
