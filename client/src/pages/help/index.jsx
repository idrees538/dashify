import { IoHelpCircleOutline, IoBookOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

function Help() {
    const faqs = [
        { q: 'How do I reset my password?', a: 'Go to Settings > Account > Change Password or click "Forgot Password" on the login page.' },
        { q: 'How do I invite team members?', a: 'Navigate to Settings > Team and click the "Invite" button to send invitations.' },
        { q: 'Can I export my data?', a: 'Yes! Go to Settings > Account > Data Export to download your data in CSV or JSON format.' },
        { q: 'How do I enable 2FA?', a: 'Go to Privacy > Two-Factor Authentication and follow the setup wizard.' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Help Center</h1>
                <p className="text-[12px] text-text-secondary">Find answers and get support.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:border-accent transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-lg text-[#A855F7] mb-3 group-hover:bg-[#A855F7] group-hover:text-white transition-all">
                        <IoBookOutline />
                    </div>
                    <p className="text-sm font-semibold text-text-primary mb-0.5">Documentation</p>
                    <p className="text-[11px] text-text-secondary">Browse guides and tutorials</p>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:border-accent transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-lg text-blue-500 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <IoChatbubbleEllipsesOutline />
                    </div>
                    <p className="text-sm font-semibold text-text-primary mb-0.5">Contact Support</p>
                    <p className="text-[11px] text-text-secondary">Get help from our team</p>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg shadow-sm border border-border-color hover:border-accent transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-lg text-emerald-500 mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <IoHelpCircleOutline />
                    </div>
                    <p className="text-sm font-semibold text-text-primary mb-0.5">FAQs</p>
                    <p className="text-[11px] text-text-secondary">Frequently asked questions</p>
                </div>
            </div>

            <div className="bg-bg-secondary rounded-lg shadow-sm border border-border-color overflow-hidden">
                <div className="p-4 px-6 border-b border-border-color bg-bg-hover/50">
                    <h3 className="text-sm font-semibold text-text-primary">Frequently Asked Questions</h3>
                </div>
                <div className="divide-y divide-border-color">
                    {faqs.map((faq, i) => (
                        <div className="flex flex-col gap-1 p-4 px-6 hover:bg-bg-hover transition-colors" key={i}>
                            <span className="text-sm font-semibold text-text-primary">{faq.q}</span>
                            <span className="text-[12px] text-text-secondary leading-relaxed">{faq.a}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Help;
