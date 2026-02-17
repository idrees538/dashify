import { IoFolderOutline } from 'react-icons/io5';

function Project() {
    const projects = [
        { name: 'Website Redesign', progress: 75, status: 'In Progress', color: '#8204ff' },
        { name: 'Mobile App v2', progress: 45, status: 'In Progress', color: '#3b82f6' },
        { name: 'API Migration', progress: 90, status: 'Review', color: '#10b981' },
        { name: 'Dashboard Analytics', progress: 20, status: 'Planning', color: '#f59e0b' },
    ];

    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Projects</h1>
                <p className="page__subtitle">Overview of all ongoing and upcoming projects.</p>
            </div>

            <div className="page__cards">
                {projects.map((proj, i) => (
                    <div className="card" key={i}>
                        <div className="card__icon" style={{ background: `${proj.color}18`, color: proj.color }}>
                            <IoFolderOutline />
                        </div>
                        <p className="card__label">{proj.name}</p>
                        <div style={{ marginTop: 12 }}>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', marginBottom: 6,
                                fontSize: 13, color: 'var(--text-secondary)'
                            }}>
                                <span>{proj.status}</span>
                                <span>{proj.progress}%</span>
                            </div>
                            <div style={{
                                height: 6, borderRadius: 3, background: 'var(--bg-hover)', overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${proj.progress}%`, height: '100%', borderRadius: 3, background: proj.color,
                                    transition: 'width 0.5s ease'
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
