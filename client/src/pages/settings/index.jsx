import {
    IoPersonOutline,
    IoMailOutline,
    IoShieldCheckmarkOutline,
    IoLogOutOutline,
    IoSunnyOutline,
    IoMoonOutline,
} from 'react-icons/io5';
import { useTheme } from '../../contexts/ThemeContext';
import './Settings.css';

function Settings() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Settings</h1>
                <p className="page__subtitle">Manage your account preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="card settings-profile">
                <div className="settings-profile__avatar">
                    <IoPersonOutline />
                </div>
                <div className="settings-profile__info">
                    <h2 className="settings-profile__name">John Doe</h2>
                    <p className="settings-profile__role">Pro Creator</p>
                </div>
            </div>

            {/* Settings Rows */}
            <div className="settings-group">
                <h3 className="settings-group__title">Account Information</h3>

                <div className="card settings-row">
                    <div className="settings-row__left">
                        <div className="settings-row__icon settings-row__icon--blue">
                            <IoMailOutline />
                        </div>
                        <div>
                            <p className="settings-row__label">Email Address</p>
                            <p className="settings-row__value">john.doe@example.com</p>
                        </div>
                    </div>
                </div>

                <div className="card settings-row">
                    <div className="settings-row__left">
                        <div className="settings-row__icon settings-row__icon--green">
                            <IoShieldCheckmarkOutline />
                        </div>
                        <div>
                            <p className="settings-row__label">Account Status</p>
                            <p className="settings-row__value">
                                <span className="dash-badge dash-badge--active" style={{ fontSize: 13 }}>Active</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-group">
                <h3 className="settings-group__title">Appearance</h3>

                <div className="card settings-row">
                    <div className="settings-row__left">
                        <div className="settings-row__icon settings-row__icon--purple">
                            {theme === 'dark' ? <IoMoonOutline /> : <IoSunnyOutline />}
                        </div>
                        <div>
                            <p className="settings-row__label">Theme</p>
                            <p className="settings-row__value">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                        </div>
                    </div>
                    <button className="settings-toggle" onClick={toggleTheme}>
                        <span className={`settings-toggle__track ${theme === 'dark' ? 'settings-toggle__track--on' : ''}`}>
                            <span className="settings-toggle__thumb" />
                        </span>
                    </button>
                </div>
            </div>

            <div className="settings-group">
                <h3 className="settings-group__title">Actions</h3>
                <button className="settings-logout">
                    <IoLogOutOutline /> Logout
                </button>
            </div>
        </div>
    );
}

export default Settings;
