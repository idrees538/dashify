import { IoPeopleOutline } from 'react-icons/io5';

function Shared() {
    const sharedItems = [
        { name: 'Design System v3.pdf', sharedBy: 'Sarah Wilson', members: 8, type: 'document' },
        { name: 'Sprint Retrospective', sharedBy: 'Mike Johnson', members: 12, type: 'board' },
        { name: 'Marketing Assets', sharedBy: 'Emily Davis', members: 5, type: 'folder' },
        { name: 'Product Roadmap 2025', sharedBy: 'John Doe', members: 15, type: 'document' },
    ];

    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Shared</h1>
                <p className="page__subtitle">Files and resources shared with you.</p>
            </div>

            <div className="page__cards">
                <div className="card">
                    <div className="card__icon card__icon--purple"><IoPeopleOutline /></div>
                    <p className="card__label">Shared with me</p>
                    <h2 className="card__value">47</h2>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--blue"><IoPeopleOutline /></div>
                    <p className="card__label">Shared by me</p>
                    <h2 className="card__value">23</h2>
                </div>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Recently Shared</h3>
                </div>
                <div className="table-placeholder__rows">
                    {sharedItems.map((item, i) => (
                        <div className="table-placeholder__row" key={i}>
                            <div style={{ flex: 2, fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</div>
                            <div style={{ flex: 1, fontSize: 14, color: 'var(--text-secondary)' }}>{item.sharedBy}</div>
                            <div style={{ minWidth: 80, fontSize: 13, color: 'var(--text-secondary)' }}>{item.members} members</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shared;
