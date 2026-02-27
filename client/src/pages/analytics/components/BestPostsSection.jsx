import React from 'react';
import { IoHeart, IoChatbubble, IoEye, IoShareSocial, IoFlash } from 'react-icons/io5';

const BestPostsSection = ({ posts = [] }) => {
    // Mock data if none provided
    const displayPosts = posts.length > 0 ? posts : [
        {
            id: 1,
            thumbnail: 'https://images.unsplash.com/photo-16111626177ea5-b6c9d71d3f3b?w=800&q=80',
            likes: '12.4K',
            comments: '425',
            views: '145K',
            engagement: '8.4%',
        },
        {
            id: 2,
            thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
            likes: '8.2K',
            comments: '182',
            views: '92K',
            engagement: '6.2%',
        },
        {
            id: 3,
            thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80',
            likes: '15.1K',
            comments: '642',
            views: '180K',
            engagement: '9.8%',
        },
        {
            id: 4,
            thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80',
            likes: '9.5K',
            comments: '215',
            views: '110K',
            engagement: '7.1%',
        }
    ];

    return (
        <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
                    Best Performing Posts
                    <div className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">Top Reach</div>
                </h2>
                <button className="text-[12px] font-bold text-accent hover:underline">View All Posts</button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {displayPosts.map((post) => (
                    <div key={post.id} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border-color shadow-md group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300">
                            <img
                                src={post.thumbnail}
                                alt="Best post"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-1.5 text-white">
                                        <IoHeart className="text-pink-500" />
                                        <span className="text-[11px] font-bold">{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-white">
                                        <IoChatbubble className="text-blue-400" />
                                        <span className="text-[11px] font-bold">{post.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-white">
                                        <IoEye className="text-emerald-400" />
                                        <span className="text-[11px] font-bold">{post.views}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-white">
                                        <IoFlash className="text-yellow-400" />
                                        <span className="text-[11px] font-bold">{post.engagement}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rank Badge */}
                            <div className="absolute top-3 left-3 w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30 text-white font-black text-sm">
                                #{post.id}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestPostsSection;
