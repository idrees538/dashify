import { IoHomeOutline, IoPeopleOutline, IoTrendingUpOutline, IoCartOutline } from 'react-icons/io5';

function Dashboard() {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Dashboard</h1>
                <p className="page__subtitle">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="page__cards">
                <div className="card">
                    <div className="card__icon card__icon--purple"><IoHomeOutline /></div>
                    <p className="card__label">Total Revenue</p>
                    <h2 className="card__value">$48,520</h2>
                    <span className="card__change card__change--up">↑ 12.5% from last month</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--blue"><IoPeopleOutline /></div>
                    <p className="card__label">Active Users</p>
                    <h2 className="card__value">2,847</h2>
                    <span className="card__change card__change--up">↑ 8.2% from last week</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--green"><IoTrendingUpOutline /></div>
                    <p className="card__label">Conversions</p>
                    <h2 className="card__value">1,234</h2>
                    <span className="card__change card__change--down">↓ 3.1% from yesterday</span>
                </div>
                <div className="card">
                    <div className="card__icon card__icon--orange"><IoCartOutline /></div>
                    <p className="card__label">Total Orders</p>
                    <h2 className="card__value">856</h2>
                    <span className="card__change card__change--up">↑ 5.7% from last month</span>
                </div>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Recent Activity</h3>
                </div>
                <div className="table-placeholder__rows">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div className="table-placeholder__row" key={i}>
                            <div className="table-placeholder__cell" style={{ maxWidth: 40, height: 40, borderRadius: '50%' }} />
                            <div className="table-placeholder__cell" />
                            <div className="table-placeholder__cell" style={{ maxWidth: 80 }} />
                            <div className="table-placeholder__cell" style={{ maxWidth: 100 }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
