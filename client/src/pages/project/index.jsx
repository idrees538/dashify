import { IoAddOutline, IoFolderOutline } from 'react-icons/io5';

function Project() {
    // Dummy flag to simulate if a user has a linked project
    const hasProject = false; // change to true to preview the list state

    if (!hasProject) {
        return (
            <div className="max-w-[1200px] mx-auto animate-fade-in">
                <header className="mb-8">
                    <h1 className="text-[26px] font-bold text-text-primary mb-2">Projects</h1>
                    <p className="text-[15px] text-text-secondary font-normal">Link your account to a project to get started.</p>
                </header>

                <div className="rounded-xl border border-dashed border-border-color p-8 bg-bg-secondary shadow-sm text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-bg-hover flex items-center justify-center text-3xl text-text-secondary mb-4">
                            <IoFolderOutline />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">No project linked</h3>
                        <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">No project is linked to your email yet. Start a new project to collaborate with your team.</p>
                        <button className="px-6 py-2.5 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition-opacity shadow-sm">
                            Start a project
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Example list if a project exists
    const projects = [
        { name: 'Acme Studio', status: 'Active' },
        { name: 'Marketing Site', status: 'Draft' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <header className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Projects</h1>
                <p className="text-[15px] text-text-secondary font-normal">Your linked projects.</p>
            </header>

            <div className="grid gap-4">
                {projects.map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-xl border border-border-color bg-bg-secondary p-4 px-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-accent bg-accent-light">
                                <IoFolderOutline className="text-xl" />
                            </div>
                            <div className="text-text-primary font-semibold">{p.name}</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-text-secondary/10 text-text-secondary'}`}>{p.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
