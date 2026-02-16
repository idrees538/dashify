import { IoMailOutline, IoTrendingUpOutline, IoEyeOutline, IoTimeOutline } from 'react-icons/io5';

function Analytics() {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Analytics</h1>
                <p className="page__subtitle">Track your performance metrics and insights.</p>
            </div>

            <div className="page__cards">
                <div className="card">
                    <div className="card__icon card__icon--blue"><IoMailOutline /></div>
                    <p className="card__label">Email Open Rate</p>
                    <h2 className="card__value">67.8%</h2>
                    <span className="card__change card__change--up">↑ 4.3% this week</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--green"><IoTrendingUpOutline /></div>
                    <p className="card__label">Growth Rate</p>
                    <h2 className="card__value">23.1%</h2>
                    <span className="card__change card__change--up">↑ 2.8% this month</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--purple"><IoEyeOutline /></div>
                    <p className="card__label">Page Views</p>
                    <h2 className="card__value">145K</h2>
                    <span className="card__change card__change--up">↑ 18.2% this week</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--cyan"><IoTimeOutline /></div>
                    <p className="card__label">Avg. Session</p>
                    <h2 className="card__value">4m 32s</h2>
                    <span className="card__change card__change--down">↓ 1.2% this week</span>
                </div>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Top Performing Channels</h3>
                </div>
                <div className="table-placeholder__rows">
                    {[1, 2, 3, 4].map((i) => (
                        <div className="table-placeholder__row" key={i}>
                            <div className="table-placeholder__cell" />
                            <div className="table-placeholder__cell" style={{ maxWidth: 100 }} />
                            <div className="table-placeholder__cell" style={{ maxWidth: 60 }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Analytics;
