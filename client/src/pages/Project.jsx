import { IoAddOutline, IoFolderOutline } from 'react-icons/io5';

function Project() {
    // Dummy flag to simulate if a user has a linked project
    const hasProject = false; // change to true to preview the list state

    if (!hasProject) {
        return (
            <div className="max-w-4xl mx-auto animate-[pageIn_0.4s_ease]">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Projects</h1>
                    <p className="text-[var(--text-secondary)]">Link your account to a project to get started.</p>
                </header>

                <div className="rounded-xl border border-dashed border-[var(--border-color)] p-6 bg-[var(--bg-secondary)] shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-lg text-[var(--text-primary)]">Project</span>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">
                            <IoAddOutline />
                        </button>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-3">No project is linked to your email yet.</p>
                    <div className="mt-5">
                        <button className="px-3 py-2 rounded-md bg-[var(--accent-light)] text-[var(--badge-text)] font-medium">
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
        <div className="max-w-4xl mx-auto animate-[pageIn_0.4s_ease]">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Projects</h1>
                <p className="text-[var(--text-secondary)]">Your linked projects.</p>
            </header>

            <div className="grid gap-4">
                {projects.map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--icon-active)] bg-[var(--accent-light)]">
                                <IoFolderOutline />
                            </div>
                            <div className="text-[var(--text-primary)] font-medium">{p.name}</div>
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">{p.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
