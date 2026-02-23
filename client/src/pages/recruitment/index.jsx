import { IoBriefcaseOutline } from 'react-icons/io5';

function Recruitment() {
    const positions = [
        { title: 'Senior Frontend Developer', dept: 'Engineering', applicants: 24, status: 'Open' },
        { title: 'Product Designer', dept: 'Design', applicants: 18, status: 'Open' },
        { title: 'DevOps Engineer', dept: 'Engineering', applicants: 12, status: 'Interview' },
        { title: 'Marketing Manager', dept: 'Marketing', applicants: 31, status: 'Open' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Recruitment</h1>
                <p className="text-[12px] text-text-secondary">Manage open positions and track applicants.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-lg text-[#A855F7] mb-3">
                        <IoBriefcaseOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Open Positions</p>
                    <h2 className="text-xl font-bold text-text-primary">12</h2>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-lg text-blue-500 mb-3">
                        <IoBriefcaseOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Total Applicants</p>
                    <h2 className="text-xl font-bold text-text-primary">284</h2>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-lg text-emerald-500 mb-3">
                        <IoBriefcaseOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Interviews Scheduled</p>
                    <h2 className="text-xl font-bold text-text-primary">18</h2>
                </div>
            </div>

            <div className="bg-bg-secondary rounded-lg shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Active Positions</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {positions.map((pos, i) => (
                        <div className="flex items-center gap-4 p-3 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <div className="flex-[2] text-sm font-semibold text-text-primary truncate">{pos.title}</div>
                            <div className="flex-1 text-[12px] text-text-secondary truncate">{pos.dept}</div>
                            <div className="min-w-[100px] text-[12px] text-text-secondary">{pos.applicants} applicants</div>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${pos.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
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
