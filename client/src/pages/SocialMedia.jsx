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
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Social Media</h1>
                <p className="page__subtitle">Your central hub for social media activity.</p>
            </div>

            {/* Platform Cards */}
            <div className="social-platforms">
                {PLATFORMS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                        <div className="card social-platform" key={i}>
                            <div className="social-platform__icon" style={{ color: p.color }}>
                                <Icon />
                            </div>
                            <h3 className="social-platform__name">{p.name}</h3>
                            <div className="social-platform__stats">
                                <div className="social-platform__stat">
                                    <span className="social-platform__stat-value">{p.followers}</span>
                                    <span className="social-platform__stat-label">Followers</span>
                                </div>
                                <div className="social-platform__stat">
                                    <span className="social-platform__stat-value">{p.posts}</span>
                                    <span className="social-platform__stat-label">Posts</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Posts */}
            <div className="dash-section">
                <h2 className="dash-section__title">Recent Posts</h2>
                <div className="social-posts">
                    {POSTS.map((post, i) => (
                        <div className="card social-post" key={i}>
                            <div className="social-post__header">
                                <span className="social-post__platform">{post.platform}</span>
                                <span className="social-post__time">{post.time}</span>
                            </div>
                            <p className="social-post__content">{post.content}</p>
                            <div className="social-post__engagement">
                                <span className="social-post__metric">
                                    <IoHeartOutline /> {post.likes}
                                </span>
                                <span className="social-post__metric">
                                    <IoChatbubbleOutline /> {post.comments}
                                </span>
                                <span className="social-post__metric">
                                    <IoShareOutline /> {post.shares}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="social-cta card">
                <IoLinkOutline className="social-cta__icon" />
                <div>
                    <h3 className="social-cta__title">Connect Social Account</h3>
                    <p className="social-cta__text">Link your social media accounts for advanced analytics and scheduling. <strong>Coming soon!</strong></p>
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;
