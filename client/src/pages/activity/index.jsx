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
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Activity</h1>
                <p className="text-[15px] text-text-secondary font-normal">Track recent activity across your workspace.</p>
            </div>

            <div className="bg-bg-secondary rounded-xl shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {activities.map((act, i) => (
                        <div className="flex items-center gap-4 p-4 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <div className="text-2xl min-w-[40px] text-center">{act.icon}</div>
                            <div className="flex-1 min-w-0">
                                <span className="font-semibold text-text-primary">{act.user} </span>
                                <span className="text-text-secondary">{act.action}</span>
                            </div>
                            <div className="text-[13px] text-text-secondary min-w-[80px] text-right">{act.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Activity;
