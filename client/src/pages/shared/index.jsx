import { IoPeopleOutline } from 'react-icons/io5';

function Shared() {
    const sharedItems = [
        { name: 'Design System v3.pdf', sharedBy: 'Sarah Wilson', members: 8, type: 'document' },
        { name: 'Sprint Retrospective', sharedBy: 'Mike Johnson', members: 12, type: 'board' },
        { name: 'Marketing Assets', sharedBy: 'Emily Davis', members: 5, type: 'folder' },
        { name: 'Product Roadmap 2025', sharedBy: 'John Doe', members: 15, type: 'document' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Shared</h1>
                <p className="text-[15px] text-text-secondary font-normal">Files and resources shared with you.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-xl text-[#A855F7] mb-4">
                        <IoPeopleOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Shared with me</p>
                    <h2 className="text-3xl font-bold text-text-primary">47</h2>
                </div>
                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm border border-border-color">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-xl text-blue-500 mb-4">
                        <IoPeopleOutline />
                    </div>
                    <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Shared by me</p>
                    <h2 className="text-3xl font-bold text-text-primary">23</h2>
                </div>
            </div>

            <div className="bg-bg-secondary rounded-xl shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Recently Shared</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {sharedItems.map((item, i) => (
                        <div className="flex items-center gap-4 p-4 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <div className="flex-[2] font-semibold text-text-primary truncate">{item.name}</div>
                            <div className="flex-1 text-sm text-text-secondary truncate">{item.sharedBy}</div>
                            <div className="min-w-[100px] text-[13px] text-text-secondary text-right">{item.members} members</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shared;
