import { IoFolderOutline } from 'react-icons/io5';

function Project() {
    const projects = [
        { name: 'Website Redesign', progress: 75, status: 'In Progress', color: '#8204ff' },
        { name: 'Mobile App v2', progress: 45, status: 'In Progress', color: '#3b82f6' },
        { name: 'API Migration', progress: 90, status: 'Review', color: '#10b981' },
        { name: 'Dashboard Analytics', progress: 20, status: 'Planning', color: '#f59e0b' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Projects</h1>
                <p className="text-[15px] text-secondary-text font-normal">Overview of all ongoing and upcoming projects.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-8 max-md:grid-cols-1 max-md:gap-4">
                {projects.map((proj, i) => (
                    <div className="card-base" key={i}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px]" style={{ background: `${proj.color}18`, color: proj.color }}>
                            <IoFolderOutline />
                        </div>
                        <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-2">{proj.name}</p>
                        <div className="mt-3">
                            <div className="flex justify-between mb-1.5 text-[13px] text-secondary-text">
                                <span>{proj.status}</span>
                                <span>{proj.progress}%</span>
                            </div>
                            <div className="h-1.5 rounded-[3px] bg-[#1a1a2e14] dark:bg-white/10 overflow-hidden">
                                <div className="h-full rounded-[3px] transition-[width] duration-500 ease" style={{
                                    width: `${proj.progress}%`, background: proj.color
                                }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
