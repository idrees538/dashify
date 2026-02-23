import { IoNewspaperOutline } from 'react-icons/io5';

function News() {
    const articles = [
        { title: 'Q4 Performance Report Released', category: 'Reports', time: '2h ago' },
        { title: 'New Team Members Onboarding', category: 'HR', time: '4h ago' },
        { title: 'System Maintenance Scheduled', category: 'IT', time: '6h ago' },
        { title: 'Product Launch Event Planning', category: 'Marketing', time: '1d ago' },
        { title: 'Annual Budget Review Meeting', category: 'Finance', time: '2d ago' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">News</h1>
                <p className="text-[12px] text-text-secondary">Stay updated with the latest company news and announcements.</p>
            </div>

            <div className="bg-bg-secondary rounded-lg shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Latest News</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {articles.map((article, i) => (
                        <div className="flex items-center gap-4 p-4 px-6 hover:bg-bg-hover transition-colors cursor-pointer" key={i}>
                            <div className="w-10 h-10 min-w-10 rounded-lg bg-accent-light flex items-center justify-center text-accent text-lg">
                                <IoNewspaperOutline />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-text-primary mb-0.5 truncate">{article.title}</div>
                                <div className="text-[12px] text-text-secondary">{article.category}</div>
                            </div>
                            <div className="text-[11px] text-text-secondary min-w-[60px] text-right">{article.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
