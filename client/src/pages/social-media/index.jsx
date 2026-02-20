import {
    IoLogoInstagram,
    IoLogoTwitter,
    IoLogoYoutube,
    IoLogoLinkedin,
    IoHeartOutline,
    IoChatbubbleOutline,
    IoShareOutline,
    IoLinkOutline,
} from 'react-icons/io5';
const PLATFORMS = [
    { name: 'Instagram', icon: IoLogoInstagram, followers: '12.4K', posts: 156, color: '#E1306C' },
    { name: 'Twitter / X', icon: IoLogoTwitter, followers: '8.2K', posts: 312, color: '#1DA1F2' },
    { name: 'YouTube', icon: IoLogoYoutube, followers: '5.1K', posts: 48, color: '#FF0000' },
    { name: 'LinkedIn', icon: IoLogoLinkedin, followers: '3.7K', posts: 89, color: '#0A66C2' },
];

const POSTS = [
    {
        platform: 'Instagram',
        content: '🚀 Exciting product update! Check out our new dashboard features...',
        likes: 284,
        comments: 32,
        shares: 18,
        time: '2 hours ago',
    },
    {
        platform: 'Twitter / X',
        content: 'Just launched our new analytics dashboard! 📊 Real-time insights at your fingertips.',
        likes: 156,
        comments: 24,
        shares: 45,
        time: '5 hours ago',
    },
    {
        platform: 'YouTube',
        content: 'New tutorial video: "Getting Started with Dashify" — learn how to maximize your workflow.',
        likes: 512,
        comments: 67,
        shares: 34,
        time: '1 day ago',
    },
];

function SocialMedia() {
    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Social Media</h1>
                <p className="text-[15px] text-text-secondary font-normal">Your central hub for social media activity.</p>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {PLATFORMS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                        <div className="bg-bg-secondary rounded-xl p-7 flex flex-col items-center text-center shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200" key={i}>
                            <div className="text-4xl mb-3" style={{ color: p.color }}>
                                <Icon />
                            </div>
                            <h3 className="text-base font-semibold text-text-primary mb-4">{p.name}</h3>
                            <div className="flex justify-center gap-7">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-lg font-bold text-text-primary">{p.followers}</span>
                                    <span className="text-[12px] text-text-secondary">Followers</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-lg font-bold text-text-primary">{p.posts}</span>
                                    <span className="text-[12px] text-text-secondary">Posts</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Posts */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Posts</h2>
                <div className="flex flex-col gap-4">
                    {POSTS.map((post, i) => (
                        <div className="bg-bg-secondary rounded-xl p-5 px-6 shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200" key={i}>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[13px] font-semibold text-accent bg-accent-light px-2.5 py-1 rounded-md">{post.platform}</span>
                                <span className="text-[12px] text-text-secondary">{post.time}</span>
                            </div>
                            <p className="text-sm text-text-primary leading-relaxed mb-3.5">{post.content}</p>
                            <div className="flex gap-5">
                                <span className="flex items-center gap-1.5 text-[13px] text-text-secondary font-medium">
                                    <IoHeartOutline /> {post.likes}
                                </span>
                                <span className="flex items-center gap-1.5 text-[13px] text-text-secondary font-medium">
                                    <IoChatbubbleOutline /> {post.comments}
                                </span>
                                <span className="flex items-center gap-1.5 text-[13px] text-text-secondary font-medium">
                                    <IoShareOutline /> {post.shares}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-5 mt-7 p-6 px-7 bg-black/5 dark:bg-white/5 rounded-xl border-2 border-dashed border-border-color shadow-sm">
                <IoLinkOutline className="text-[32px] text-accent flex-shrink-0" />
                <div>
                    <h3 className="text-base font-semibold text-text-primary mb-1">Connect Social Account</h3>
                    <p className="text-[13px] text-text-secondary leading-normal">Link your social media accounts for advanced analytics and scheduling. <strong>Coming soon!</strong></p>
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;
