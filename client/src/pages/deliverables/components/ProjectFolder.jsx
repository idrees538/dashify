import { IoFolderOutline, IoDocumentsOutline } from 'react-icons/io5';

function ProjectFolder({ project, isActive, onClick }) {
    return (
        <button
            className={`group w-full bg-bg-secondary rounded-xl shadow-sm border overflow-hidden cursor-pointer transition-all duration-200 text-left hover:shadow-lg ${isActive ? 'border-accent shadow-[0_0_0_2px_var(--accent-light)]' : 'border-border-color'}`}
            onClick={onClick}
        >
            <div className={`relative w-full h-40 flex items-center justify-center
                ${project.color === 'purple' ? 'bg-gradient-to-br from-[#FF6037]/25 via-[#A855F7]/15 to-black/30' :
                    project.color === 'blue' ? 'bg-gradient-to-br from-blue-500/30 via-blue-400/12 to-black/30' :
                        project.color === 'green' ? 'bg-gradient-to-br from-[#10B981]/25 via-[#34D399]/12 to-black/30' :
                            project.color === 'orange' ? 'bg-gradient-to-br from-[#F59E0B]/30 via-[#FBBF24]/12 to-black/30' :
                                'bg-gradient-to-br from-[#06B6D4]/30 via-[#67E8F9]/12 to-black/30'}`}>
                <div className="w-16 h-16 rounded-2xl bg-white/12 backdrop-blur-md flex items-center justify-center text-[30px] text-white transition-all duration-200 border border-white/15 group-hover:scale-110">
                    <IoFolderOutline />
                </div>
                <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/55 text-white text-[11px] font-semibold">
                    <IoDocumentsOutline /> {project.fileCount} files
                </span>
            </div>
            <div className="p-4 px-[18px]">
                <h3 className="text-[15px] font-semibold text-text-primary mb-1">{project.name}</h3>
                <p className="text-[12px] text-text-secondary">{project.client} · {project.date}</p>
            </div>
        </button>
    );
}

export default ProjectFolder;
