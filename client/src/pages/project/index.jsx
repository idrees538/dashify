import { IoAddOutline, IoFolderOutline } from 'react-icons/io5';

function Project() {
    // Dummy flag to simulate if a user has a linked project
    const hasProject = false; // change to true to preview the list state

    if (!hasProject) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
                <header className="mb-6">
                    <h1 className="text-base font-semibold text-text-primary">Projects</h1>
                    <p className="text-[12px] text-text-secondary">Link your account to a project to get started.</p>
                </header>

                <div className="rounded-lg border border-dashed border-border-color p-8 bg-bg-secondary shadow-sm text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-lg bg-bg-hover flex items-center justify-center text-2xl text-text-secondary mb-4">
                            <IoFolderOutline />
                        </div>
                        <h3 className="text-base font-semibold text-text-primary mb-1.5">No project linked</h3>
                        <p className="text-[12px] text-text-secondary mb-6 max-w-sm mx-auto">No project is linked to your email yet. Start a new project to collaborate with your team.</p>
                        <button className="px-4 py-2 rounded-lg bg-accent text-white font-semibold hover:opacity-90 transition-opacity shadow-sm text-sm">
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
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <header className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Projects</h1>
                <p className="text-[12px] text-text-secondary">Your linked projects.</p>
            </header>

            <div className="grid gap-4">
                {projects.map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-lg border border-border-color bg-bg-secondary p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-accent bg-accent-light">
                                <IoFolderOutline className="text-lg" />
                            </div>
                            <div className="text-sm text-text-primary font-semibold">{p.name}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wide ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-text-secondary/10 text-text-secondary'}`}>{p.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
