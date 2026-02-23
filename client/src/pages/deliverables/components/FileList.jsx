import { IoArrowBackOutline, IoDocumentsOutline } from 'react-icons/io5';
import FileItem from './FileItem';

function FileList({ project, onBack }) {
    return (
        <div className="bg-bg-secondary rounded-lg shadow-sm border border-border-color p-0 animate-fade-in">
            <div className="flex items-center gap-3 pb-3.5 border-b border-border-color m-4 mb-2">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-lg text-text-secondary bg-bg-hover transition-all hover:text-text-primary hover:bg-bg-active flex-shrink-0" onClick={onBack}>
                    <IoArrowBackOutline />
                </button>
                <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-text-primary">{project.name}</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-bg-hover text-text-secondary text-[11px] font-semibold">
                        <IoDocumentsOutline /> {project.files.length} files
                    </span>
                </div>
            </div>
            <div className="flex flex-col">
                {project.files.map((file) => (
                    <FileItem key={file.id} file={file} />
                ))}
            </div>
        </div>
    );
}

export default FileList;
