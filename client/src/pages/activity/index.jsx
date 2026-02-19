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
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Activity</h1>
                <p className="page__subtitle">Track recent activity across your workspace.</p>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Recent Activity</h3>
                </div>
                <div className="table-placeholder__rows">
                    {activities.map((act, i) => (
                        <div className="table-placeholder__row" key={i}>
                            <div style={{ fontSize: 24, minWidth: 40, textAlign: 'center' }}>{act.icon}</div>
                            <div style={{ flex: 1 }}>
                                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{act.user} </span>
                                <span style={{ color: 'var(--text-secondary)' }}>{act.action}</span>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', minWidth: 80, textAlign: 'right' }}>{act.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Activity;
