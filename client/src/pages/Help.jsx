import { IoHelpCircleOutline, IoBookOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

function Help() {
    const faqs = [
        { q: 'How do I reset my password?', a: 'Go to Settings > Account > Change Password or click "Forgot Password" on the login page.' },
        { q: 'How do I invite team members?', a: 'Navigate to Settings > Team and click the "Invite" button to send invitations.' },
        { q: 'Can I export my data?', a: 'Yes! Go to Settings > Account > Data Export to download your data in CSV or JSON format.' },
        { q: 'How do I enable 2FA?', a: 'Go to Privacy > Two-Factor Authentication and follow the setup wizard.' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Help Center</h1>
                <p className="text-[15px] text-secondary-text font-normal">Find answers and get support.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-8 max-md:grid-cols-1 max-md:gap-4">
                <div className="card-base cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#8204ff1f] text-accent transition-transform duration-200 group-hover:scale-110"><IoBookOutline /></div>
                    <p className="text-base font-semibold text-primary-text mb-1">Documentation</p>
                    <p className="text-[13px] text-secondary-text">Browse guides and tutorials</p>
                </div>
                <div className="card-base cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#3b82f61f] text-[#3b82f6] transition-transform duration-200 group-hover:scale-110"><IoChatbubbleEllipsesOutline /></div>
                    <p className="text-base font-semibold text-primary-text mb-1">Contact Support</p>
                    <p className="text-[13px] text-secondary-text">Get help from our team</p>
                </div>
                <div className="card-base cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] bg-[#10b9811f] text-[#10b981] transition-transform duration-200 group-hover:scale-110"><IoHelpCircleOutline /></div>
                    <p className="text-base font-semibold text-primary-text mb-1">FAQs</p>
                    <p className="text-[13px] text-secondary-text">Frequently asked questions</p>
                </div>
            </div>

            <div className="bg-card-bg rounded-2xl p-6 shadow-main border border-border-main transition-colors duration-300">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-primary-text">Frequently Asked Questions</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <div className="flex flex-col items-start gap-1.5 py-4 border-b border-border-main last:border-0" key={i}>
                            <span className="font-medium text-primary-text">{faq.q}</span>
                            <span className="text-sm text-secondary-text leading-relaxed">{faq.a}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Help;
