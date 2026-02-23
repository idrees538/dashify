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
        <div className="max-w-[1200px] mx-auto h-[calc(100vh-140px)] flex flex-col px-4 py-4 animate-fade-in">
            <div className="mb-6 flex-shrink-0">
                <h1 className="text-base font-semibold text-text-primary">Chat</h1>
                <p className="text-[12px] text-text-secondary">Stay connected with your team.</p>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-[260px_1fr] bg-bg-secondary rounded-lg overflow-hidden border border-border-color shadow-sm">
                {/* Conversation List */}
                <div className="border-r border-border-color flex flex-col min-w-0">
                    <div className="p-3.5 border-b border-border-color bg-bg-hover/30">
                        <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider">Messages</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-1">
                        {conversations.map((conv) => (
                            <div key={conv.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10 cursor-pointer hover:bg-accent/10 transition-colors">
                                <div className="w-9 h-9 min-w-9 rounded-full bg-accent flex items-center justify-center text-white font-bold text-[12px] shadow-sm ring-2 ring-accent/20">DT</div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-text-primary text-[13px] truncate">{conv.name}</div>
                                    <div className="text-[11px] text-text-secondary truncate">{conv.lastMsg}</div>
                                </div>
                                {conv.unread > 0 && (
                                    <span className="min-w-[20px] h-5 px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center shadow-sm">{conv.unread}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex flex-col min-h-0 bg-bg-primary/30">
                    {/* Header could go here, but omitted based on original */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {conversations[0].messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] group relative ${msg.self ? 'items-end' : 'items-start'} flex flex-col`}>
                                    <div className={`p-3.5 px-4 rounded-lg shadow-sm text-sm leading-relaxed ${msg.self ? 'bg-accent text-white rounded-tr-none' : 'bg-bg-secondary text-text-primary border border-border-color rounded-tl-none'}`}>
                                        {!msg.self && <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-accent">{msg.from}</div>}
                                        <p>{msg.text}</p>
                                        <div className={`text-[10px] mt-1.5 opacity-60 font-medium ${msg.self ? 'text-white' : 'text-text-secondary'}`}>{msg.time}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3.5 bg-bg-secondary border-t border-border-color">
                        <div className="flex items-center gap-3 p-1.5 px-3 bg-bg-primary rounded-lg border border-border-color focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-secondary/50 py-2"
                            />
                            <button className="w-8 h-8 min-w-8 rounded-md bg-accent flex items-center justify-center text-white text-base hover:scale-105 active:scale-95 transition-all shadow-sm">
                                <IoSendOutline />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
