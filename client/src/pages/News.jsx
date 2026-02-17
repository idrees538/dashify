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
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">News</h1>
                <p className="text-[15px] text-secondary-text font-normal">Stay updated with the latest company news and announcements.</p>
            </div>

            <div className="bg-card-bg rounded-2xl p-6 shadow-main border border-border-main transition-colors duration-300">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-primary-text">Latest News</h3>
                </div>
                <div className="flex flex-col gap-1">
                    {articles.map((article, i) => (
                        <div className="flex items-center gap-4 py-3.5 border-b border-border-main last:border-0 cursor-pointer group hover:bg-hover-bg/50 px-2 -mx-2 rounded-xl transition-all" key={i}>
                            <div className="w-10 h-10 min-w-[40px] rounded-xl bg-accent-light text-accent flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
                                <IoNewspaperOutline />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-primary-text mb-0.5 group-hover:text-accent transition-colors">{article.title}</div>
                                <div className="text-[13px] text-secondary-text">{article.category}</div>
                            </div>
                            <div className="text-[13px] text-secondary-text min-w-[50px] text-right">{article.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
