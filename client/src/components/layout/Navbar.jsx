import { IoNotificationsOutline, IoSettingsOutline, IoMegaphoneOutline, IoMenuOutline } from 'react-icons/io5';
import dvAvatar from '../../assets/Dv.svg';

function Navbar() {
    return (
        <nav className="top-navbar">


            <div className="top-navbar__right">
                <div style={{ position: 'relative' }}>
                    <button className="top-navbar__btn" title="Menu">
                        <IoMenuOutline />
                    </button>
                </div>
                <div style={{ position: 'relative' }}>
                    <button className="top-navbar__btn" title="Notifications">
                        <IoNotificationsOutline />
                    </button>
                    <span className="top-navbar__dot" />
                </div>
                <div style={{ position: 'relative' }}>
                    <button className="top-navbar__btn" title="Settings">
                        <IoSettingsOutline />
                    </button>
                    <span className="top-navbar__dot" />
                </div>
                <div style={{ position: 'relative' }}>
                    <button className="top-navbar__btn" title="Announcements">
                        <IoMegaphoneOutline />
                    </button>
                    <span className="top-navbar__dot" />
                </div>

                <div className="top-navbar__divider" />

                <div className="top-navbar__user">
                    {/* <div className="top-navbar__user-info">
                        <p className="top-navbar__user-name">DashView</p>
                        <p className="top-navbar__user-role">Admin</p>
                    </div> */}
                    <div className="top-navbar__btn" title="Profile" style={{ padding: 0 }}>
                        <img
                            src={dvAvatar}
                            alt="Profile"
                            className="top-navbar__avatar"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
