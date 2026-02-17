import { IoChatbubbleOutline, IoSendOutline } from 'react-icons/io5';
import { useState } from 'react';

function Chat() {
    const [message, setMessage] = useState('');
    const conversations = [
        {
            id: 1, name: 'Design Team', lastMsg: 'Updated the mockups!', time: '2m ago', unread: 3,
            messages: [
                { from: 'Sarah', text: 'Hey, the new mockups are ready for review.', time: '10:30 AM', self: false },
                { from: 'You', text: 'Great, I will check them out!', time: '10:32 AM', self: true },
                { from: 'Sarah', text: 'Updated the mockups!', time: '10:35 AM', self: false },
            ],
        },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Chat</h1>
                <p className="text-[15px] text-secondary-text font-normal">Stay connected with your team.</p>
            </div>

            <div className="grid grid-cols-[280px_1fr] gap-0 bg-card-bg rounded-2xl overflow-hidden border border-border-main shadow-main min-h-[500px] max-md:grid-cols-1">
                {/* Conversation List */}
                <div className="border-r border-border-main p-4 max-md:border-r-0 max-md:border-b">
                    <h3 className="text-base font-semibold mb-4 text-primary-text">Messages</h3>
                    {conversations.map((conv) => (
                        <div key={conv.id} className="flex items-center gap-3 p-2 rounded-xl bg-accent-light/50 cursor-pointer mb-1 transition-colors hover:bg-accent-light">
                            <div className="w-10 h-10 min-w-[40px] rounded-full bg-linear-[135deg,#8204ff,#a855f7] flex items-center justify-center text-white font-medium text-sm">DT</div>
                            <div className="flex-1 overflow-hidden">
                                <div className="font-medium text-primary-text text-sm">{conv.name}</div>
                                <div className="text-[13px] text-secondary-text whitespace-nowrap overflow-hidden text-ellipsis">{conv.lastMsg}</div>
                            </div>
                            {conv.unread > 0 && (
                                <span className="min-w-[20px] h-5 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center">{conv.unread}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Chat Area */}
                <div className="flex flex-col p-4">
                    <div className="flex-1 flex flex-col gap-3 pb-4">
                        {conversations[0].messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-[10px_14px] rounded-xl text-sm leading-relaxed ${msg.self ? 'bg-accent text-white' : 'bg-[#1a1a2e14] dark:bg-white/10 text-primary-text'
                                    }`}>
                                    {!msg.self && <div className="text-[12px] font-bold mb-1 text-accent">{msg.from}</div>}
                                    <p>{msg.text}</p>
                                    <div className="text-[11px] mt-1 opacity-70 text-right">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-[#1a1a2e14] dark:bg-white/10 rounded-xl">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 py-2.5 px-3.5 bg-transparent border-none outline-none text-sm text-primary-text"
                        />
                        <button className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white text-base shadow-sm hover:scale-105 transition-transform">
                            <IoSendOutline />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
