import { useState, useEffect } from 'react';
import { IoCardOutline, IoAddOutline, IoEllipsisHorizontal, IoDownloadOutline } from 'react-icons/io5';
import api from '../../services/api';

function Billing() {
    const [subscription, setSubscription] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            api.get('/credits/subscription'),
            api.get('/credits/transactions', { limit: 10, type: 'credit' }) // 'credit' usually for payments
        ]).then(([subRes, txRes]) => {
            setSubscription(subRes.data?.subscription);
            setTransactions(txRes.data || []);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-base font-semibold text-text-primary">Billing</h1>
                    <p className="text-[12px] text-text-secondary">Manage your subscription and payment methods.</p>
                </div>
                {subscription && (
                    <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${subscription.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                            {subscription.status}
                        </span>
                        <p className="text-[11px] text-text-secondary mt-1">Next renewal: {new Date(subscription.currentCycleEnd).toLocaleDateString()}</p>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-6">
                    {/* Visual Card Section */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                        <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider">Current Plan</h3>

                        <div className="bg-bg-secondary border border-border-color rounded-2xl p-6 shadow-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2">Dashify Subscription</p>
                                <h2 className="text-3xl font-bold text-text-primary mb-1">
                                    ${subscription?.priceThisCycle || '---'}
                                    <span className="text-sm font-normal text-text-secondary ml-1">/ month</span>
                                </h2>
                                <p className="text-xs text-text-secondary">{subscription?.consecutiveMonths > 1 ? 'Consecutive Month Discount Applied' : 'Standard First Month Plan'}</p>

                                <div className="mt-6 pt-6 border-t border-border-color flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <IoCardOutline className="text-lg text-text-secondary" />
                                        <span className="text-text-primary font-medium">•••• •••• •••• 4242</span>
                                    </div>
                                    <button className="text-accent font-bold hover:underline">Edit</button>
                                </div>
                            </div>
                            {/* Decorative background circle */}
                            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-accent/5 rounded-full" />
                        </div>

                        <button className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dashed border-border-color text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all text-sm font-medium">
                            <IoAddOutline className="text-lg" />
                            Add New Method
                        </button>
                    </div>

                    {/* Recent Payments Section */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
                        <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider">Payment History</h3>

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
                                    {(subscription?.history?.length > 0) ? [...subscription.history].reverse().map((h, i) => (
                                        <tr key={i} className="border-b border-border-color last:border-0 hover:bg-bg-hover/50 transition-colors">
                                            <td className="px-4 py-3 text-sm font-semibold text-text-primary">INV-{new Date(h.cycleStart).getTime().toString().slice(-6)}</td>
                                            <td className="px-4 py-3 text-[12px] text-text-secondary">{new Date(h.cycleStart).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-sm font-bold text-text-primary">${h.price}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500">
                                                    Paid
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button className="p-1.5 text-text-secondary hover:text-accent transition-colors">
                                                    <IoDownloadOutline />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center text-text-secondary text-sm">No payment history found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Billing;
