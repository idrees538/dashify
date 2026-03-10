import { useState, useEffect } from 'react';
import { IoSearchOutline, IoGridOutline, IoListOutline } from 'react-icons/io5';
import ProjectFolder from './components/ProjectFolder';
import FileList from './components/FileList';
import api from '../../services/api';


function Deliverables() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('folder'); // 'folder' or 'list'
    const [openProjectId, setOpenProjectId] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
        api.get('/projects')
            .then((res) => setProjects(res.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const openProject = projects.find((p) => p._id === openProjectId);

    const filteredProjects = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.client && p.client.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in px-4 py-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-base font-semibold text-text-primary">Deliverables</h1>
                    <p className="text-[12px] text-text-secondary">
                        Browse project folders and access all your delivered files.
                    </p>
                </div>
                {!openProject && (
                    <div className="flex items-center bg-bg-secondary border border-border-color rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('folder')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'folder' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            <IoGridOutline className="text-sm" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            <IoListOutline className="text-sm" />
                        </button>
                    </div>
                )}
            </div>

            {/* Search bar */}
            {!openProject && (
                <div className="relative mb-6">
                    <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-2.5 bg-bg-secondary border border-border-color rounded-lg text-sm focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/60 shadow-sm"
                        placeholder="Search projects…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            ) : openProject ? (
                <FileList
                    project={openProject}
                    onBack={() => setOpenProjectId(null)}
                />
            ) : viewMode === 'list' ? (
                <div className="bg-bg-secondary rounded-xl border border-border-color overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color bg-black/[0.02]">
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Project</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Files</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Last Modified</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((p) => (
                                <tr key={p._id} className="border-b border-border-color last:border-0 hover:bg-bg-hover transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                                        <p className="text-[10px] text-text-secondary">{p.client || 'Acme Corp'}</p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">{p.files?.length || 0} files</td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">{new Date(p.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={() => setOpenProjectId(p._id)}
                                            className="text-[11px] font-bold uppercase tracking-wider text-accent hover:underline"
                                        >
                                            Open folder
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectFolder
                            key={project._id}
                            project={project}
                            isActive={false}
                            onClick={() => setOpenProjectId(project._id)}
                        />
                    ))}
                    {filteredProjects.length === 0 && (
                        <div className="col-span-full flex items-center justify-center p-12 bg-bg-secondary rounded-xl shadow-sm border border-border-color text-text-secondary text-[15px]">
                            <p>No projects match your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Deliverables;
