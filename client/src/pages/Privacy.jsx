import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoEyeOffOutline } from 'react-icons/io5';

function Privacy() {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Privacy</h1>
                <p className="page__subtitle">Manage your privacy settings and data controls.</p>
            </div>

            <div className="page__cards">
                <div className="card">
                    <div className="card__icon card__icon--green"><IoShieldCheckmarkOutline /></div>
                    <p className="card__label">Security Score</p>
                    <h2 className="card__value">92%</h2>
                    <span className="card__change card__change--up">Strong</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--blue"><IoLockClosedOutline /></div>
                    <p className="card__label">2FA Status</p>
                    <h2 className="card__value">Active</h2>
                    <span className="card__change card__change--up">Enabled</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--purple"><IoEyeOffOutline /></div>
                    <p className="card__label">Data Sharing</p>
                    <h2 className="card__value">Limited</h2>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Minimal data shared</span>
                </div>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Privacy Controls</h3>
                </div>
                <div className="table-placeholder__rows">
                    {['Profile Visibility', 'Activity Status', 'Read Receipts', 'Data Analytics', 'Third-party Access'].map((item, i) => (
                        <div className="table-placeholder__row" key={i} style={{ justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item}</span>
                            <div style={{
                                width: 44, height: 24, borderRadius: 12, background: i < 3 ? '#10b981' : 'var(--bg-hover)',
                                position: 'relative', cursor: 'pointer'
                            }}>
                                <div style={{
                                    width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute',
                                    top: 2, left: i < 3 ? 22 : 2, transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Privacy;
