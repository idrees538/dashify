import { IoPeopleOutline } from 'react-icons/io5';

function Shared() {
    const sharedItems = [
        { name: 'Design System v3.pdf', sharedBy: 'Sarah Wilson', members: 8, type: 'document' },
        { name: 'Sprint Retrospective', sharedBy: 'Mike Johnson', members: 12, type: 'board' },
        { name: 'Marketing Assets', sharedBy: 'Emily Davis', members: 5, type: 'folder' },
        { name: 'Product Roadmap 2025', sharedBy: 'John Doe', members: 15, type: 'document' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Shared</h1>
                <p className="text-[15px] text-secondary-text font-normal">Files and resources shared with you.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-8 max-md:grid-cols-1 max-md:gap-4">
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#8204ff1f] text-accent"><IoPeopleOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-1">Shared with me</p>
                    <h2 className="text-2xl font-bold text-primary-text">47</h2>
                </div>
                <div className="card-base">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#3b82f61f] text-[#3b82f6]"><IoPeopleOutline /></div>
                    <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-1">Shared by me</p>
                    <h2 className="text-2xl font-bold text-primary-text">23</h2>
                </div>
            </div>

            <div className="bg-card-bg rounded-2xl p-6 shadow-main border border-border-main transition-colors duration-300">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-primary-text">Recently Shared</h3>
                </div>
                <div className="flex flex-col gap-1">
                    {sharedItems.map((item, i) => (
                        <div className="flex items-center gap-4 py-3.5 border-b border-border-main last:border-0" key={i}>
                            <div className="flex-[2] font-medium text-primary-text">{item.name}</div>
                            <div className="flex-1 text-sm text-secondary-text max-md:hidden">{item.sharedBy}</div>
                            <div className="min-w-[100px] text-[13px] text-secondary-text text-right">{item.members} members</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shared;
