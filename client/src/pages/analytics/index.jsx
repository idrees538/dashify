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

const INSTAGRAM_METRICS = [
    {
        label: 'Followers',
        value: '124.5K',
        change: '4.2%',
        up: true,
        icon: IoPeopleOutline,
        info: 'Total number of followers on your Instagram account.',
        colorClass: 'bg-pink-500/10 text-pink-500'
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
        label: 'Follower Growth',
        value: '+2,450',
        change: '1.8%',
        up: true,
        icon: IoTrendingUpOutline,
        info: 'Total number of followers gained in the selected time period.',
        colorClass: 'bg-green-500/10 text-green-500'
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
        label: 'Interactions',
        value: '45.2K',
        change: '8.4%',
        up: true,
        icon: IoHeartOutline,
        info: 'Total number of likes, comments, saves, and shares.',
        colorClass: 'bg-red-500/10 text-red-500'
    },
    {
        label: 'Views',
        value: '842.1K',
        change: '12.5%',
        up: true,
        icon: IoEyeOutline,
        info: 'How many times your posts were seen on the feed.',
        colorClass: 'bg-blue-500/10 text-blue-500'
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
        label: 'Engagement Rate',
        value: '3.1%',
        change: '0.4%',
        up: true,
        icon: IoTrendingUpOutline,
        info: 'Derived from (Total Interactions / Followers) * 100.',
        colorClass: 'bg-indigo-500/10 text-indigo-500'
    },
    {
        label: 'Engagement Growth %',
        value: '+12.5%',
        change: '2.1%',
        up: true,
        icon: IoTrendingUpOutline,
        info: 'The % increase from last time periods engagement rate to now.',
        colorClass: 'bg-indigo-400/10 text-indigo-400'
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
        label: 'Watch Time',
        value: '2.4K hrs',
        change: '15.2%',
        up: true,
        icon: IoTimeOutline,
        info: 'Total hours users spent watching your video content.',
        colorClass: 'bg-yellow-500/10 text-yellow-500'
    },
    {
        label: 'Likes',
        value: '32.1K',
        change: '7.8%',
        up: true,
        icon: IoHeartOutline,
        info: 'Total number of likes across all content.',
        colorClass: 'bg-red-400/10 text-red-400'
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

            <div className="space-y-4">
                <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
                    Key Metrics <span className="text-[12px] text-text-secondary font-normal capitalize">({activePlatform})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {INSTAGRAM_METRICS.map((metric, i) => (
                        <MetricCard key={i} {...metric} />
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h2 className="text-base font-semibold text-text-primary">Audience Demographics</h2>
                <DemographicsSection />
            </div>
        </div>
    );
}

export default Analytics;
