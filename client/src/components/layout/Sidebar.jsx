import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import {
    IoHomeOutline,
    IoCalendarOutline,
    IoBarChartOutline,
    IoCardOutline,
    IoCheckboxOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoChevronDownOutline,
    IoChevronUpOutline,
    IoFolderOutline,
    IoSettingsOutline,
    IoHelpCircleOutline,
    IoChatbubbleOutline,
    IoSunnyOutline,
    IoMoonOutline,
    IoAddOutline,
    IoMenuOutline,
    IoCloseOutline,
    IoLogOutOutline,
} from 'react-icons/io5';
import webLogo from '../../assets/web_logo.svg';
import lightWebLogo from '../../assets/light_web_logo.svg';
import dvAvatar from '../../assets/Dv.svg';
import './Sidebar.css';

const CAP_ITEMS = [
    { name: 'Dashboard', icon: IoHomeOutline, path: '/dashboard' },
    { name: 'Calendar', icon: IoCalendarOutline, path: '/schedule' },
    { name: 'Analytics', icon: IoBarChartOutline, path: '/analytics' },
    { name: 'Credits', icon: IoCardOutline, path: '/credits' },
    { name: 'Review', icon: IoCheckboxOutline, path: '/review' },
    { name: 'Deliverables', icon: IoDocumentTextOutline, path: '/deliverables' },
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [showCap, setShowCap] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Auto-collapse on tablet and hide on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCollapsed(false);
                setMobileOpen(false);
            } else if (window.innerWidth <= 1024) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const currentLogo = theme === 'light' ? lightWebLogo : webLogo;
    const hasProject = false; // TODO: replace with real project presence
    const projectName = 'Acme Studio';

    return (
        <>
            {/* Mobile Header / Hamburger */}
            <header className="mobile-header">
                <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
                    <IoMenuOutline />
                </button>
                <div className="mobile-logo">
                    <img src={currentLogo} alt="Dashify Logo" />
                    <span>Dashify</span>
                </div>
            </header>

            {/* Mobile Overlay */}
            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

            <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
                {/* Mobile Close Button */}
                <button className="sidebar__close-btn" onClick={() => setMobileOpen(false)}>
                    <IoCloseOutline />
                </button>

                {/* Top section: Logo + User (DashView) */}
                <div className="sidebar__section">
                    {/* Logo */}
                    <div className="sidebar__logo">
                        <div className="sidebar__logo-icon">
                            <img src={currentLogo} alt="Dashify Logo" className="sidebar__logo-img" />
                        </div>
                        <span className="sidebar__logo-text">Dashify</span>
                    </div>
                    {/* DashView user at top */}
                    <div className="sidebar__user">
                        <div className="sidebar__user-info">
                            <img src={dvAvatar} alt="DashView" className="sidebar__user-avatar-img" />
                            <span className="sidebar__user-name">DashView</span>
                        </div>
                    </div>
                </div>

                {/* General Section (placeholder for future items) */}
                {/* <div className="sidebar__section">
                    <span className="sidebar__label">General</span>
                    <nav className="sidebar__nav" />
                </div> */}

                {/* Projects Section */}
                <div className="sidebar__section">
                    <span className="sidebar__label">General</span>
                    <nav className="sidebar__nav">
                        {!hasProject ? (
                            <NavLink className="sidebar__start-project">
                                <span>Project</span>
                                <IoAddOutline />
                            </NavLink>
                        ) : (
                            <NavLink to="/project" className={`sidebar__nav-item ${location.pathname === '/project' ? 'sidebar__nav-item--active' : ''}`}>
                                <div className="sidebar__nav-link sidebar__nav-link--project">
                                    <span className="sidebar__nav-text">{projectName}</span>
                                    <span className="sidebar__nav-icon">
                                        <IoFolderOutline />
                                    </span>
                                </div>
                            </NavLink>
                        )}
                    </nav>
                </div>

                {/* Content Accelerator Program */}
                <div className="sidebar__section">
                    <span className="sidebar__label">Content Accelerator Program</span>
                    {showCap && (
                        <nav className="sidebar__nav">
                            {CAP_ITEMS.map((item) => {
                                const isActive = location.pathname === item.path;
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        to={item.path}
                                        key={item.name + item.path}
                                        className={`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
                                    >
                                        <div className="sidebar__nav-link">
                                            <span className="sidebar__nav-icon">
                                                <Icon />
                                            </span>
                                            <span className="sidebar__nav-text">{item.name}</span>
                                        </div>
                                        <span className="sidebar__tooltip">{item.name}</span>
                                    </NavLink>
                                );
                            })}
                        </nav>
                    )}
                </div>

                {/* Bottom: Collapse Toggle + Theme Toggle */}
                <div className="sidebar__bottom">
                    <button className="sidebar__pdf-btn" title="Download PDF Report (coming soon)">
                        <IoDownloadOutline />
                        <span>PDF Report</span>
                    </button>

                    {/* Collapse toggle moved to bottom */}
                    <button
                        className="sidebar__collapse-toggle"
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? 'Expand menu' : 'Collapse menu'}
                    >
                        <IoLogOutOutline className={!collapsed ? 'sidebar__icon-flipped' : ''} />
                        <span className="sidebar__collapse-text">{collapsed ? 'Expand' : 'Collapse'} Menu</span>
                    </button>

                    <div className="sidebar__theme-row">
                        <div
                            className={`sidebar__theme-toggle ${theme === 'light' ? 'sidebar__theme-toggle--light' : ''
                                }`}
                            onClick={toggleTheme}
                            role="button"
                            tabIndex={0}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            <span className="sidebar__theme-knob" />
                            <span className={`sidebar__theme-icon ${theme === 'light' ? 'sidebar__theme-icon--active' : 'sidebar__theme-icon--inactive'}`}>
                                <IoSunnyOutline />
                            </span>
                            <span className={`sidebar__theme-icon ${theme === 'dark' ? 'sidebar__theme-icon--active' : 'sidebar__theme-icon--inactive'}`}>
                                <IoMoonOutline />
                            </span>
                        </div>
                        <span className="sidebar__theme-label">
                            {theme === 'dark' ? 'Darkmode' : 'Lightmode'}
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
