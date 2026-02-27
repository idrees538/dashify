import React from 'react';
import {
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaTiktok,
    FaFacebookF,
    FaLinkedinIn,
    FaTwitch,
    FaPlus
} from 'react-icons/fa';

const SOCIAL_PLATFORMS = [
    { id: 'instagram', icon: FaInstagram, color: '#E1306C', label: 'Instagram' },
    { id: 'twitter', icon: FaTwitter, color: '#1DA1F2', label: 'Twitter' },
    { id: 'youtube', icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
    { id: 'tiktok', icon: FaTiktok, color: '#000000', label: 'TikTok' },
    { id: 'facebook', icon: FaFacebookF, color: '#1877F2', label: 'Facebook' },
    { id: 'linkedin', icon: FaLinkedinIn, color: '#0A66C2', label: 'LinkedIn' },
    { id: 'twitch', icon: FaTwitch, color: '#9146FF', label: 'Twitch' },
];

const SocialToolbar = ({ activePlatform, onSelect }) => {
    return (
        <div className="flex items-center justify-between bg-bg-secondary border border-border-color rounded-lg p-2 mb-4 shadow-sm">
            <div className="flex items-center gap-2">
                {SOCIAL_PLATFORMS.map((platform) => {
                    const Icon = platform.icon;
                    const isActive = activePlatform === platform.id;

                    return (
                        <button
                            key={platform.id}
                            onClick={() => onSelect(platform.id)}
                            className={`
                                relative w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200
                                ${isActive
                                    ? 'bg-accent/10 scale-105'
                                    : 'hover:bg-bg-hover grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                                }
                            `}
                            title={platform.label}
                        >
                            <Icon
                                style={{ color: isActive ? platform.color : 'inherit' }}
                                size={18}
                                className="transition-all duration-300"
                            />
                            {isActive && (
                                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent" />
                            )}
                        </button>
                    );
                })}
            </div>

            <button
                className="w-8 h-8 flex items-center justify-center rounded-md border border-dashed border-border-color text-text-secondary hover:border-accent hover:text-accent transition-all duration-200"
                title="Add Account"
            >
                <FaPlus size={16} />
            </button>
        </div>
    );
};

export default SocialToolbar;