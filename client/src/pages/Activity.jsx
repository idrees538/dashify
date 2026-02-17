import { IoFlagOutline } from 'react-icons/io5';

function Activity() {
    const activities = [
        { user: 'John Doe', action: 'created a new project', time: '2 min ago', icon: '🚀' },
        { user: 'Jane Smith', action: 'completed task "UI Review"', time: '15 min ago', icon: '✅' },
        { user: 'Mike Johnson', action: 'uploaded design files', time: '1h ago', icon: '📁' },
        { user: 'Sarah Wilson', action: 'commented on Sprint Plan', time: '2h ago', icon: '💬' },
        { user: 'Alex Brown', action: 'merged pull request #142', time: '3h ago', icon: '🔀' },
        { user: 'Emily Davis', action: 'updated project settings', time: '5h ago', icon: '⚙️' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Activity</h1>
                <p className="text-[15px] text-secondary-text font-normal">Track recent activity across your workspace.</p>
            </div>

            <div className="bg-card-bg rounded-2xl p-6 shadow-main border border-border-main transition-colors duration-300">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-primary-text">Recent Activity</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {activities.map((act, i) => (
                        <div className="flex items-center gap-4 py-3.5 border-b border-border-main last:border-0" key={i}>
                            <div className="text-2xl min-w-[40px] text-center">{act.icon}</div>
                            <div className="flex-1">
                                <span className="font-medium text-primary-text">{act.user} </span>
                                <span className="text-secondary-text">{act.action}</span>
                            </div>
                            <div className="text-[13px] text-secondary-text min-w-[80px] text-right">{act.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Activity;
