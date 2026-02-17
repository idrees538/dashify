import { IoBriefcaseOutline } from 'react-icons/io5';

function Recruitment() {
    const positions = [
        { title: 'Senior Frontend Developer', dept: 'Engineering', applicants: 24, status: 'Open' },
        { title: 'Product Designer', dept: 'Design', applicants: 18, status: 'Open' },
        { title: 'DevOps Engineer', dept: 'Engineering', applicants: 12, status: 'Interview' },
        { title: 'Marketing Manager', dept: 'Marketing', applicants: 31, status: 'Open' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Recruitment</h1>
                <p className="text-[15px] text-secondary-text font-normal">Manage open positions and track applicants.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-8 max-md:grid-cols-1 max-md:gap-4">
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#8204ff1f] text-accent"><IoBriefcaseOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-1">Open Positions</p>
                    <h2 className="text-2xl font-bold text-primary-text">12</h2>
                </div>
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#3b82f61f] text-[#3b82f6]"><IoBriefcaseOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-1">Total Applicants</p>
                    <h2 className="text-2xl font-bold text-primary-text">284</h2>
                </div>
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#10b9811f] text-[#10b981]"><IoBriefcaseOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-1">Interviews Scheduled</p>
                    <h2 className="text-2xl font-bold text-primary-text">18</h2>
                </div>
            </div>

            <div className="bg-card-bg rounded-2xl p-6 shadow-main border border-border-main transition-colors duration-300">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-primary-text">Active Positions</h3>
                </div>
                <div className="flex flex-col gap-1">
                    {positions.map((pos, i) => (
                        <div className="flex items-center gap-4 py-3.5 border-b border-border-main last:border-0" key={i}>
                            <div className="flex-[2] font-medium text-primary-text">{pos.title}</div>
                            <div className="flex-1 text-sm text-secondary-text max-md:hidden">{pos.dept}</div>
                            <div className="min-w-[100px] text-sm text-secondary-text">{pos.applicants} applicants</div>
                            <div className={`flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-bold ${pos.status === 'Open'
                                    ? 'bg-[#10b98126] text-[#10b981] border border-[#10b9814d]'
                                    : 'bg-[#3b82f626] text-[#3b82f6] border border-[#3b82f64d]'
                                }`}>{pos.status}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recruitment;
