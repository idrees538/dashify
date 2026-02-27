import React, { useState } from 'react';
import {
    IoPeopleOutline,
    IoImagesOutline,
    IoTrendingUpOutline,
    IoChatbubbleOutline,
    IoHeartOutline,
    IoShareSocialOutline,
    IoEyeOutline,
    IoFlashOutline,
    IoPulseOutline,
    IoTimeOutline,
    IoBookmarkOutline
} from 'react-icons/io5';
import SocialToolbar from './components/SocialToolbar';
import MetricCard from './components/MetricCard';
import DemographicsSection from './components/DemographicsSection';
import ProfileGrade from './components/ProfileGrade';
import BestPostsSection from './components/BestPostsSection';

const INSTAGRAM_METRICS = [
    {
        label: 'Followers',
        value: '124.5K',
        change: '4.2%',
        up: true,
        icon: IoPeopleOutline,
        info: 'Total number of followers on your Instagram account.',
        colorClass: 'bg-red-500/10 text-red-500',
        chartData: [40, 45, 42, 48, 52, 50, 55] // Higher priority/Red labeled
    },
    {
        label: 'Interactions',
        value: '45.2K',
        change: '8.4%',
        up: true,
        icon: IoHeartOutline,
        info: 'Total number of likes, comments, saves, and shares.',
        colorClass: 'bg-red-500/10 text-red-500',
        chartData: [30, 35, 32, 40, 38, 42, 45]
    },
    {
        label: 'Views',
        value: '842.1K',
        change: '12.5%',
        up: true,
        icon: IoEyeOutline,
        info: 'How many times your posts were seen on the feed.',
        colorClass: 'bg-red-500/10 text-red-500',
        chartData: [50, 55, 52, 60, 58, 65, 70]
    },
    {
        label: 'Watch Time',
        value: '2.4K hrs',
        change: '15.2%',
        up: true,
        icon: IoTimeOutline,
        info: 'Total hours users spent watching your video content.',
        colorClass: 'bg-red-500/10 text-red-500',
        chartData: [20, 25, 22, 28, 26, 30, 32]
    },
    {
        label: 'Follower Growth',
        value: '+2,450',
        change: '1.8%',
        up: true,
        icon: IoTrendingUpOutline,
        info: 'Total number of followers gained in the selected time period.',
        colorClass: 'bg-green-500/10 text-green-500',
        showChart: true,
        chartData: [30, 32, 35, 40, 38, 42, 45]
    },
    {
        label: 'Engagement Rate',
        value: '3.1%',
        change: '0.4%',
        up: true,
        icon: IoTrendingUpOutline,
        info: 'Derived from (Total Interactions / Followers) * 100.',
        colorClass: 'bg-green-500/10 text-green-500',
        showChart: true,
        chartData: [3.0, 3.1, 2.9, 3.2, 3.1, 3.3, 3.1]
    },
    {
        label: 'Engagement Growth %',
        value: '+12.5%',
        change: '2.1%',
        up: true,
        icon: IoTrendingUpOutline,
        info: 'The % increase from last time periods engagement rate to now.',
        colorClass: 'bg-green-400/10 text-green-400',
        showChart: true,
        chartData: [10, 11, 10.5, 12, 11.5, 13, 12.5]
    },
    {
        label: 'Likes',
        value: '32.1K',
        change: '7.8%',
        up: true,
        icon: IoHeartOutline,
        info: 'Total number of likes across all content.',
        colorClass: 'bg-green-500/10 text-green-500',
        showChart: true,
        chartData: [28, 30, 29, 32, 31, 33, 32.1]
    },
    {
        label: 'All Posts',
        value: '1,280',
        change: '12',
        up: true,
        icon: IoImagesOutline,
        info: 'Total number of reels, stories, and feed posts.',
        colorClass: 'bg-purple-500/10 text-purple-500'
    },
    {
        label: 'Follower Growth %',
        value: '2.4%',
        change: '0.5%',
        up: true,
        icon: IoTrendingUpOutline,
        info: 'Total growth percentage of followers in the selected time period.',
        colorClass: 'bg-green-400/10 text-green-400'
    },
    {
        label: 'Accounts Engaged',
        value: '38.4K',
        change: '5.2%',
        up: true,
        icon: IoFlashOutline,
        info: 'Total number of unique accounts that interacted with your content.',
        colorClass: 'bg-orange-500/10 text-orange-500'
    },
    {
        label: 'Engagement / Post',
        value: '425',
        change: '15',
        up: true,
        icon: IoFlashOutline,
        info: 'The average number of engagement you receive in correlation to your number of posts.',
        colorClass: 'bg-orange-400/10 text-orange-400'
    },
    {
        label: 'Comments',
        value: '4,210',
        change: '2.1%',
        up: false,
        icon: IoChatbubbleOutline,
        info: 'Total number of comments on your content.',
        colorClass: 'bg-cyan-500/10 text-cyan-500'
    },
    {
        label: 'Shares',
        value: '8,420',
        change: '14.5%',
        up: true,
        icon: IoShareSocialOutline,
        info: 'Total number of times your content was shared.',
        colorClass: 'bg-blue-400/10 text-blue-400'
    },
    {
        label: 'Saves',
        value: '2,840',
        change: '1.2%',
        up: true,
        icon: IoBookmarkOutline,
        info: 'Total number of times your posts were saved.',
        colorClass: 'bg-teal-500/10 text-teal-500'
    },
];

const LINKEDIN_METRICS = [
    { label: 'Impressions', value: '45.2K', change: '8.4%', up: true, icon: IoEyeOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [30, 35, 32, 40, 38, 42, 45] },
    { label: 'Engagements', value: '2.8K', change: '12.5%', up: true, icon: IoFlashOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [50, 55, 52, 60, 58, 65, 70] },
    { label: 'Follower Growth', value: '+342', change: '2.1%', up: true, icon: IoTrendingUpOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [10, 11, 10.5, 12, 11.5, 13, 12.5] },
    { label: 'Profile Views', value: '1,240', change: '5.2%', up: true, icon: IoPeopleOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [20, 25, 22, 28, 26, 30, 32] },
];

const TWITCH_METRICS = [
    { label: 'Avg Viewers', value: '1,420', change: '15.2%', up: true, icon: IoEyeOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [800, 950, 1100, 1050, 1300, 1400, 1420] },
    { label: 'Followers', value: '18.5K', change: '4.2%', up: true, icon: IoPeopleOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [17000, 17200, 17500, 17800, 18100, 18300, 18500] },
    { label: 'Minutes Streamed', value: '12.4K', change: '8.4%', up: true, icon: IoTimeOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [1000, 1100, 1050, 1200, 1150, 1300, 1250] },
    { label: 'Subscribers', value: '842', change: '3.8%', up: true, icon: IoHeartOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [780, 795, 810, 805, 825, 835, 842] },
];

const TWITTER_METRICS = [
    { label: 'Impressions', value: '1.2M', change: '12.4%', up: true, icon: IoEyeOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [100, 120, 115, 130, 125, 140, 150] },
    { label: 'Profile Visits', value: '45.8K', change: '5.2%', up: true, icon: IoPeopleOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [40, 42, 41, 44, 43, 45, 46] },
    { label: 'Mentions', value: '2.4K', change: '8.1%', up: true, icon: IoChatbubbleOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [2, 2.2, 2.1, 2.3, 2.2, 2.4, 2.5] },
    { label: 'Followers', value: '12.1K', change: '1.2%', up: true, icon: IoPeopleOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [11.8, 11.9, 11.9, 12.0, 12.0, 12.1, 12.1] },
];

const YOUTUBE_METRICS = [
    { label: 'Subscribers', value: '840K', change: '6.2%', up: true, icon: IoPeopleOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [820, 825, 830, 832, 835, 838, 840] },
    { label: 'Views', value: '12.4M', change: '15.8%', up: true, icon: IoEyeOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [10, 11, 10.5, 12, 11.5, 12.2, 12.4] },
    { label: 'Watch Time (Hrs)', value: '250K', change: '12.1%', up: true, icon: IoTimeOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [220, 225, 230, 235, 240, 245, 250] },
    { label: 'Avg View Duration', value: '4:12', change: '2.4%', up: true, icon: IoFlashOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [4.0, 4.1, 4.05, 4.15, 4.1, 4.12, 4.12] },
];

const TIKTOK_METRICS = [
    { label: 'Followers', value: '2.4M', change: '18.4%', up: true, icon: IoPeopleOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [2.0, 2.1, 2.2, 2.25, 2.3, 2.35, 2.4] },
    { label: 'Total Likes', value: '45.2M', change: '12.8%', up: true, icon: IoHeartOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [40, 41, 42, 43, 44, 45, 45.2] },
    { label: 'Video Views', value: '180M', change: '22.1%', up: true, icon: IoEyeOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [140, 150, 160, 165, 170, 175, 180] },
    { label: 'Profile Views', value: '840K', change: '15.2%', up: true, icon: IoPeopleOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [700, 750, 780, 800, 810, 830, 840] },
];

const FACEBOOK_METRICS = [
    { label: 'Page Likes', value: '120K', change: '4.2%', up: true, icon: IoHeartOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [115, 116, 117, 118, 119, 119.5, 120] },
    { label: 'Reach', value: '842K', change: '8.4%', up: true, icon: IoEyeOutline, colorClass: 'bg-red-500/10 text-red-500', chartData: [780, 800, 810, 820, 830, 835, 842] },
    { label: 'Engagement', value: '32.1K', change: '6.8%', up: true, icon: IoFlashOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [28, 29, 30, 30.5, 31, 31.5, 32.1] },
    { label: 'Post Clicks', value: '15.4K', change: '12.5%', up: true, icon: IoFlashOutline, colorClass: 'bg-green-500/10 text-green-500', showChart: true, chartData: [12, 13, 13.5, 14, 14.5, 15, 15.4] },
];

const PLATFORM_BEST_POSTS = {
    instagram: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-16111626177ea5-b6c9d71d3f3b?w=800&q=80', likes: '12.4K', comments: '425', views: '145K', engagement: '8.4%' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', likes: '8.2K', comments: '182', views: '92K', engagement: '6.2%' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80', likes: '15.1K', comments: '642', views: '180K', engagement: '9.8%' },
        { id: 4, thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80', likes: '9.5K', comments: '215', views: '110K', engagement: '7.1%' }
    ],
    linkedin: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', likes: '1.2K', comments: '85', views: '45K', engagement: '4.2%' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', likes: '850', comments: '42', views: '32K', engagement: '3.1%' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80', likes: '2.1K', comments: '124', views: '82K', engagement: '5.4%' },
        { id: 4, thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', likes: '920', comments: '38', views: '28K', engagement: '2.9%' }
    ],
    twitch: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', likes: '4.2K', comments: '12.5K', views: '180K', engagement: '15.2%' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', likes: '3.1K', comments: '8.4K', views: '120K', engagement: '12.1%' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-1560253023-3ee5d6447644?w=800&q=80', likes: '5.8K', comments: '15.2K', views: '240K', engagement: '18.4%' },
        { id: 4, thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80', likes: '2.9K', comments: '6.2K', views: '95K', engagement: '10.8%' }
    ],
    twitter: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80', likes: '8.4K', comments: '1.2K', views: '250K', engagement: '12.4%' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=800&q=80', likes: '12.1K', comments: '2.4K', views: '420K', engagement: '14.8%' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-1611606101944-48ac820384aa?w=800&q=80', likes: '5.2K', comments: '840', views: '180K', engagement: '9.2%' },
        { id: 4, thumbnail: 'https://images.unsplash.com/photo-1611162616484-9674820421de?w=800&q=80', likes: '6.8K', comments: '920', views: '210K', engagement: '11.1%' }
    ],
    youtube: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80', likes: '24K', comments: '4.2K', views: '1.2M', engagement: '8.4%' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1611162616484-9674820421de?w=800&q=80', likes: '18K', comments: '2.8K', views: '840K', engagement: '6.2%' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-1620330223749-4309301e7e43?w=800&q=80', likes: '32K', comments: '5.1K', views: '2.4M', engagement: '12.1%' },
        { id: 4, thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e443d1f9?w=800&q=80', likes: '15K', comments: '1.9K', views: '620K', engagement: '5.8%' }
    ],
    facebook: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-16111626177ea5-b6c9d71d3f3b?w=800&q=80', likes: '5.4K', comments: '840', views: '120K', engagement: '4.2%' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', likes: '8.2K', comments: '1.2K', views: '180K', engagement: '5.1%' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80', likes: '12K', comments: '2.4K', views: '320K', engagement: '6.8%' },
        { id: 4, thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80', likes: '4.1K', comments: '620', views: '95K', engagement: '3.9%' }
    ],
    tiktok: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', likes: '145K', comments: '12K', views: '2.4M', engagement: '18.4%' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80', likes: '82K', comments: '8.4K', views: '1.2M', engagement: '15.2%' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-16111626177ea5-b6c9d71d3f3b?w=800&q=80', likes: '240K', comments: '24K', views: '4.8M', engagement: '22.1%' },
        { id: 4, thumbnail: 'https://images.unsplash.com/photo-1620330223749-4309301e7e43?w=800&q=80', likes: '95K', comments: '6.2K', views: '1.8M', engagement: '12.8%' }
    ]
};

function Analytics() {
    const [activePlatform, setActivePlatform] = useState('instagram');

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-base font-semibold text-text-primary">Analytics</h1>
                    <p className="text-[12px] text-text-secondary">Explore your social media metrics</p>
                </div>
                <div className="flex bg-bg-secondary p-1 rounded-lg border border-border-color shadow-sm">
                    {['7D', '30D', '90D', 'All'].map((period) => (
                        <button
                            key={period}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${period === '30D' ? 'bg-accent text-white shadow-lg' : 'text-text-secondary hover:bg-bg-hover'}`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </header>

            <SocialToolbar
                activePlatform={activePlatform}
                onSelect={setActivePlatform}
            />

            <ProfileGrade />

            <div className="space-y-4">
                <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
                    Key Metrics <span className="text-[12px] text-text-secondary font-normal capitalize">({activePlatform})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {(() => {
                        switch (activePlatform) {
                            case 'linkedin': return LINKEDIN_METRICS;
                            case 'twitch': return TWITCH_METRICS;
                            case 'twitter': return TWITTER_METRICS;
                            case 'youtube': return YOUTUBE_METRICS;
                            case 'tiktok': return TIKTOK_METRICS;
                            case 'facebook': return FACEBOOK_METRICS;
                            default: return INSTAGRAM_METRICS;
                        }
                    })().map((metric, i) => (
                        <MetricCard key={i} {...metric} />
                    ))}
                </div>
            </div>

            <BestPostsSection posts={PLATFORM_BEST_POSTS[activePlatform] || PLATFORM_BEST_POSTS.instagram} />

            <div className="space-y-4 pt-4">
                <h2 className="text-base font-semibold text-text-primary">Audience Demographics</h2>
                <DemographicsSection />
            </div>
        </div>
    );
}

export default Analytics;
