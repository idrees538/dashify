import { IoPeopleOutline } from 'react-icons/io5';

function Shared() {
    const sharedItems = [
        { name: 'Design System v3.pdf', sharedBy: 'Sarah Wilson', members: 8, type: 'document' },
        { name: 'Sprint Retrospective', sharedBy: 'Mike Johnson', members: 12, type: 'board' },
        { name: 'Marketing Assets', sharedBy: 'Emily Davis', members: 5, type: 'folder' },
        { name: 'Product Roadmap 2025', sharedBy: 'John Doe', members: 15, type: 'document' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Shared</h1>
                <p className="text-[12px] text-text-secondary">Files and resources shared with you.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-lg text-[#A855F7] mb-3">
                        <IoPeopleOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Shared with me</p>
                    <h2 className="text-xl font-bold text-text-primary">47</h2>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-lg text-blue-500 mb-3">
                        <IoPeopleOutline />
                    </div>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Shared by me</p>
                    <h2 className="text-xl font-bold text-text-primary">23</h2>
                </div>
            </div>

            <div className="bg-bg-secondary rounded-lg shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Recently Shared</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {sharedItems.map((item, i) => (
                        <div className="flex items-center gap-4 p-3.5 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <div className="flex-[2] text-sm font-semibold text-text-primary truncate">{item.name}</div>
                            <div className="flex-1 text-[12px] text-text-secondary truncate">{item.sharedBy}</div>
                            <div className="min-w-[100px] text-[11px] font-medium text-text-secondary text-right">{item.members} members</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shared;
