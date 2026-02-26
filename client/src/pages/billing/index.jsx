import { IoCardOutline, IoAddOutline, IoEllipsisHorizontal, IoDownloadOutline } from 'react-icons/io5';

const PAYMENTS = [
    { id: 'INV-001', date: 'Feb 24, 2025', amount: '$499.00', status: 'Paid' },
    { id: 'INV-002', date: 'Jan 24, 2025', amount: '$499.00', status: 'Paid' },
    { id: 'INV-003', date: 'Dec 24, 2024', amount: '$499.00', status: 'Paid' },
];

function Billing() {
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Billing</h1>
                <p className="text-[12px] text-text-secondary">Manage your subscription and payment methods.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Visual Card Section */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                    <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider">Payment Methods</h3>

                    {/* CSS Card Visual */}
                    <div className="relative aspect-[1.6/1] w-full max-w-[400px] rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 p-6 text-white shadow-xl overflow-hidden group">
                        {/* Glassmorphism overlays */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl -ml-12 -mb-12" />

                        <div className="relative h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-medium opacity-80 uppercase tracking-widest italic">Triptych Card</span>
                                <div className="w-10 h-8 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <div className="w-6 h-4 bg-yellow-400/80 rounded-sm" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] opacity-60 uppercase tracking-widest">Card Number</span>
                                <span className="text-xl font-bold tracking-[0.2em]">•••• •••• •••• 4242</span>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] opacity-60 uppercase tracking-widest">Card Holder</span>
                                    <span className="text-sm font-semibold tracking-wide">JOHN DOE</span>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    <span className="text-[10px] opacity-60 uppercase tracking-widest">Expires</span>
                                    <span className="text-sm font-semibold">12/28</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dashed border-border-color text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all text-sm font-medium">
                        <IoAddOutline className="text-lg" />
                        Add New Method
                    </button>
                </div>

                {/* Recent Payments Section */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
                    <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider">Recent Payments</h3>

                    <div className="bg-bg-secondary rounded-xl border border-border-color shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-color/50 bg-black/[0.02] dark:bg-white/[0.02]">
                                    <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Invoice</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {PAYMENTS.map((payment) => (
                                    <tr key={payment.id} className="border-b border-border-color last:border-0 hover:bg-bg-hover/50 transition-colors">
                                        <td className="px-4 py-3 text-sm font-semibold text-text-primary">{payment.id}</td>
                                        <td className="px-4 py-3 text-[12px] text-text-secondary">{payment.date}</td>
                                        <td className="px-4 py-3 text-sm font-bold text-text-primary">{payment.amount}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="p-1.5 text-text-secondary hover:text-accent transition-colors">
                                                <IoDownloadOutline />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billing;
