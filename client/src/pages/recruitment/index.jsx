import { IoBriefcaseOutline } from 'react-icons/io5';

function Recruitment() {
    const positions = [
        { title: 'Senior Frontend Developer', dept: 'Engineering', applicants: 24, status: 'Open' },
        { title: 'Product Designer', dept: 'Design', applicants: 18, status: 'Open' },
        { title: 'DevOps Engineer', dept: 'Engineering', applicants: 12, status: 'Interview' },
        { title: 'Marketing Manager', dept: 'Marketing', applicants: 31, status: 'Open' },
    ];

    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Recruitment</h1>
                <p className="page__subtitle">Manage open positions and track applicants.</p>
            </div>

            <div className="page__cards">
                <div className="card">
                    <div className="card__icon card__icon--purple"><IoBriefcaseOutline /></div>
                    <p className="card__label">Open Positions</p>
                    <h2 className="card__value">12</h2>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--blue"><IoBriefcaseOutline /></div>
                    <p className="card__label">Total Applicants</p>
                    <h2 className="card__value">284</h2>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--green"><IoBriefcaseOutline /></div>
                    <p className="card__label">Interviews Scheduled</p>
                    <h2 className="card__value">18</h2>
                </div>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Active Positions</h3>
                </div>
                <div className="table-placeholder__rows">
                    {positions.map((pos, i) => (
                        <div className="table-placeholder__row" key={i}>
                            <div style={{ flex: 2, fontWeight: 500, color: 'var(--text-primary)' }}>{pos.title}</div>
                            <div style={{ flex: 1, fontSize: 14, color: 'var(--text-secondary)' }}>{pos.dept}</div>
                            <div style={{ minWidth: 80, fontSize: 14, color: 'var(--text-secondary)' }}>{pos.applicants} applicants</div>
                            <div style={{
                                padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                                background: pos.status === 'Open' ? 'rgba(16,185,129,0.12)' : 'rgba(59,130,246,0.12)',
                                color: pos.status === 'Open' ? '#10b981' : '#3b82f6',
                            }}>{pos.status}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recruitment;
