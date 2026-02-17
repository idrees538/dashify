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
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Social Media</h1>
                <p className="text-[15px] text-secondary-text font-normal">Your central hub for social media activity.</p>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 mb-10">
                {PLATFORMS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                        <div className="card-base flex flex-col items-center text-center" key={i}>
                            <div className="text-[48px] mb-4" style={{ color: p.color }}>
                                <Icon />
                            </div>
                            <h3 className="text-[18px] font-semibold text-primary-text mb-4">{p.name}</h3>
                            <div className="flex gap-8 w-full justify-center pt-4 border-t border-border-main">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold text-primary-text">{p.followers}</span>
                                    <span className="text-[12px] text-secondary-text uppercase tracking-[0.5px] font-medium">Followers</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold text-primary-text">{p.posts}</span>
                                    <span className="text-[12px] text-secondary-text uppercase tracking-[0.5px] font-medium">Posts</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Posts */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-primary-text mb-4">Recent Posts</h2>
                <div className="flex flex-col gap-4">
                    {POSTS.map((post, i) => (
                        <div className="card-base p-5" key={i}>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[13px] font-semibold text-accent uppercase tracking-[0.5px]">{post.platform}</span>
                                <span className="text-[12px] text-secondary-text">{post.time}</span>
                            </div>
                            <p className="text-[15px] text-primary-text mb-5 leading-[1.6]">{post.content}</p>
                            <div className="flex gap-5 border-t border-border-main pt-4">
                                <span className="flex items-center gap-1.5 text-[14px] text-secondary-text font-medium transition-colors hover:text-accent cursor-pointer">
                                    <IoHeartOutline /> {post.likes}
                                </span>
                                <span className="flex items-center gap-1.5 text-[14px] text-secondary-text font-medium transition-colors hover:text-accent cursor-pointer">
                                    <IoChatbubbleOutline /> {post.comments}
                                </span>
                                <span className="flex items-center gap-1.5 text-[14px] text-secondary-text font-medium transition-colors hover:text-accent cursor-pointer">
                                    <IoShareOutline /> {post.shares}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6 p-7 mb-8 bg-linear-[135deg,var(--accent)_0%,#a855f7_100%] text-white rounded-[20px] shadow-large">
                <IoLinkOutline className="text-[40px] opacity-80 shrink-0" />
                <div>
                    <h3 className="text-[18px] font-bold text-white mb-2">Connect Social Account</h3>
                    <p className="text-sm text-white/80">Link your social media accounts for advanced analytics and scheduling. <strong>Coming soon!</strong></p>
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;
