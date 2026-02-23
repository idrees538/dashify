import React from 'react';
import {
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaTiktok,
    FaFacebookF,
    FaPlus
} from 'react-icons/fa';

const SOCIAL_PLATFORMS = [
    { id: 'instagram', icon: FaInstagram, color: '#E1306C', label: 'Instagram' },
    { id: 'twitter', icon: FaTwitter, color: '#1DA1F2', label: 'Twitter' },
    { id: 'youtube', icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
    { id: 'tiktok', icon: FaTiktok, color: '#000000', label: 'TikTok' },
    { id: 'facebook', icon: FaFacebookF, color: '#1877F2', label: 'Facebook' },
];

const SocialToolbar = ({ activePlatform, onSelect }) => {
    return (
        <div className="flex items-center justify-between bg-bg-secondary border border-border-color rounded-lg p-2.5 mb-6 shadow-sm">
            <div className="flex items-center gap-3">
                {SOCIAL_PLATFORMS.map((platform) => {
                    const Icon = platform.icon;
                    const isActive = activePlatform === platform.id;

                    return (
                        <button
                            key={platform.id}
                            onClick={() => onSelect(platform.id)}
                            className={`
                                relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200
                                ${isActive
                                    ? 'bg-accent/10 scale-110'
                                    : 'hover:bg-bg-hover grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                                }
                            `}
                            title={platform.label}
                        >
                            <Icon
                                style={{ color: isActive ? platform.color : 'inherit' }}
                                size={24}
                                className="transition-all duration-300"
                            />
                            {isActive && (
                                <div
                                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-accent"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <button
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-dashed border-border-color text-text-secondary hover:border-accent hover:text-accent transition-all duration-200"
                title="Add Account"
            >
                <FaPlus size={18} />
            </button>
        </div>
    );
};

export default SocialToolbar;
