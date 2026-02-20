import { IoBriefcaseOutline } from 'react-icons/io5';

function Recruitment() {
    const positions = [
        { title: 'Senior Frontend Developer', dept: 'Engineering', applicants: 24, status: 'Open' },
        { title: 'Product Designer', dept: 'Design', applicants: 18, status: 'Open' },
        { title: 'DevOps Engineer', dept: 'Engineering', applicants: 12, status: 'Interview' },
        { title: 'Marketing Manager', dept: 'Marketing', applicants: 31, status: 'Open' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Recruitment</h1>
                <p className="text-[15px] text-text-secondary font-normal">Manage open positions and track applicants.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-xl text-[#A855F7] mb-4">
                        <IoBriefcaseOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Open Positions</p>
                    <h2 className="text-3xl font-bold text-text-primary">12</h2>
                </div>
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-xl text-blue-500 mb-4">
                        <IoBriefcaseOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Total Applicants</p>
                    <h2 className="text-3xl font-bold text-text-primary">284</h2>
                </div>
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xl text-emerald-500 mb-4">
                        <IoBriefcaseOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Interviews Scheduled</p>
                    <h2 className="text-3xl font-bold text-text-primary">18</h2>
                </div>
            </div>

            <div className="bg-bg-secondary rounded-xl shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Active Positions</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {positions.map((pos, i) => (
                        <div className="flex items-center gap-4 p-4 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <div className="flex-[2] font-semibold text-text-primary truncate">{pos.title}</div>
                            <div className="flex-1 text-sm text-text-secondary truncate">{pos.dept}</div>
                            <div className="min-w-[100px] text-sm text-text-secondary">{pos.applicants} applicants</div>
                            <div className={`px-2.5 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap ${pos.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                {pos.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recruitment;
