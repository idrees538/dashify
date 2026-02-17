import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoEyeOffOutline } from 'react-icons/io5';

function Privacy() {
    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Privacy</h1>
                <p className="text-[15px] text-secondary-text font-normal">Manage your privacy settings and data controls.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-8 max-md:grid-cols-1 max-md:gap-4">
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#10b9811f] text-[#10b981]"><IoShieldCheckmarkOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-2">Security Score</p>
                    <h2 className="text-[32px] font-bold text-primary-text mb-1">92%</h2>
                    <span className="text-[13px] font-medium text-[#10b981]">Strong</span>
                </div>
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#3b82f61f] text-[#3b82f6]"><IoLockClosedOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-2">2FA Status</p>
                    <h2 className="text-[32px] font-bold text-primary-text mb-1">Active</h2>
                    <span className="text-[13px] font-medium text-[#10b981]">Enabled</span>
                </div>
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#8204ff1f] text-accent"><IoEyeOffOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-2">Data Sharing</p>
                    <h2 className="text-[32px] font-bold text-primary-text mb-1">Limited</h2>
                    <span className="text-[13px] text-secondary-text">Minimal data shared</span>
                </div>
            </div>

            <div className="bg-card-bg rounded-2xl p-6 shadow-main border border-border-main transition-colors duration-300 max-md:p-4 max-md:overflow-x-auto">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-primary-text">Privacy Controls</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {['Profile Visibility', 'Activity Status', 'Read Receipts', 'Data Analytics', 'Third-party Access'].map((item, i) => (
                        <div className="flex items-center justify-between gap-4 py-3.5 border-b border-border-main last:border-0 max-md:min-w-[500px]" key={item}>
                            <span className="font-medium text-primary-text">{item}</span>
                            <div
                                className={`w-11 h-6 rounded-xl relative cursor-pointer transition-colors ${i < 3 ? 'bg-[#10b981]' : 'bg-[#1a1a2e14] dark:bg-white/10'}`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${i < 3 ? 'left-[22px]' : 'left-0.5'}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Privacy;
