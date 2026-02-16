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
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">News</h1>
                <p className="page__subtitle">Stay updated with the latest company news and announcements.</p>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Latest News</h3>
                </div>
                <div className="table-placeholder__rows">
                    {articles.map((article, i) => (
                        <div className="table-placeholder__row" key={i} style={{ cursor: 'pointer' }}>
                            <div style={{
                                width: 40, height: 40, minWidth: 40, borderRadius: 10,
                                background: 'var(--accent-light)', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', color: 'var(--accent)', fontSize: 18
                            }}>
                                <IoNewspaperOutline />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{article.title}</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{article.category}</div>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', minWidth: 50, textAlign: 'right' }}>{article.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
