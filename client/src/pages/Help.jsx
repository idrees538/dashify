import { IoHelpCircleOutline, IoBookOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

function Help() {
    const faqs = [
        { q: 'How do I reset my password?', a: 'Go to Settings > Account > Change Password or click "Forgot Password" on the login page.' },
        { q: 'How do I invite team members?', a: 'Navigate to Settings > Team and click the "Invite" button to send invitations.' },
        { q: 'Can I export my data?', a: 'Yes! Go to Settings > Account > Data Export to download your data in CSV or JSON format.' },
        { q: 'How do I enable 2FA?', a: 'Go to Privacy > Two-Factor Authentication and follow the setup wizard.' },
    ];

    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Help Center</h1>
                <p className="page__subtitle">Find answers and get support.</p>
            </div>

            <div className="page__cards">
                <div className="card" style={{ cursor: 'pointer' }}>
                    <div className="card__icon card__icon--purple"><IoBookOutline /></div>
                    <p className="card__label" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 16, fontWeight: 500 }}>Documentation</p>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Browse guides and tutorials</p>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                    <div className="card__icon card__icon--blue"><IoChatbubbleEllipsesOutline /></div>
                    <p className="card__label" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 16, fontWeight: 500 }}>Contact Support</p>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Get help from our team</p>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                    <div className="card__icon card__icon--green"><IoHelpCircleOutline /></div>
                    <p className="card__label" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 16, fontWeight: 500 }}>FAQs</p>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Frequently asked questions</p>
                </div>
            </div>

            <div className="table-placeholder">
                <div className="table-placeholder__header">
                    <h3 className="table-placeholder__title">Frequently Asked Questions</h3>
                </div>
                <div className="table-placeholder__rows">
                    {faqs.map((faq, i) => (
                        <div className="table-placeholder__row" key={i} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{faq.q}</span>
                            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{faq.a}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Help;
