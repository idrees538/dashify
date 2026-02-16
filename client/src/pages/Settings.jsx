import { IoSettingsOutline } from 'react-icons/io5';

function Settings() {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Settings</h1>
                <p className="page__subtitle">Configure your application preferences.</p>
            </div>

            <div className="page__cards">
                {[
                    { label: 'General', desc: 'Language, timezone, date format', icon: '⚙️' },
                    { label: 'Notifications', desc: 'Email, push, in-app alerts', icon: '🔔' },
                    { label: 'Appearance', desc: 'Theme, layout, density', icon: '🎨' },
                    { label: 'Integrations', desc: 'Connected apps and services', icon: '🔗' },
                    { label: 'Account', desc: 'Profile, password, billing', icon: '👤' },
                    { label: 'API Keys', desc: 'Manage your API credentials', icon: '🔑' },
                ].map((item, i) => (
                    <div className="card" key={i} style={{ cursor: 'pointer' }}>
                        <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                        <p className="card__label" style={{ fontSize: 16, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>{item.label}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;
