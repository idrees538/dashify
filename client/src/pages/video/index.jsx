import { IoVideocamOutline, IoFlashOutline, IoTimeOutline, IoPlayOutline } from 'react-icons/io5';
import './Video.css';

const VIDEOS = [
    { title: 'Product Demo Walkthrough', duration: '3:45', tokens: 10, color: '--purple' },
    { title: 'Marketing Campaign Intro', duration: '2:30', tokens: 8, color: '--blue' },
    { title: 'Customer Testimonial', duration: '5:12', tokens: 15, color: '--green' },
    { title: 'Feature Announcement', duration: '1:55', tokens: 6, color: '--orange' },
    { title: 'Brand Story Video', duration: '4:20', tokens: 12, color: '--cyan' },
    { title: 'Tutorial Series Ep. 1', duration: '6:08', tokens: 18, color: '--red' },
];

function Video() {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Video</h1>
                <p className="page__subtitle">Manage your video content and track usage.</p>
            </div>

            {VIDEOS.length === 0 ? (
                <div className="video-empty card">
                    <div className="video-empty__icon">
                        <IoVideocamOutline />
                    </div>
                    <h3 className="video-empty__title">No videos yet</h3>
                    <p className="video-empty__text">Content will appear here once you start creating videos.</p>
                </div>
            ) : (
                <div className="video-grid">
                    {VIDEOS.map((video, i) => (
                        <div className="card video-card" key={i}>
                            <div className={`video-card__thumb video-card__thumb${video.color}`}>
                                <div className="video-card__play">
                                    <IoPlayOutline />
                                </div>
                                <span className="video-card__duration">
                                    <IoTimeOutline /> {video.duration}
                                </span>
                            </div>
                            <div className="video-card__info">
                                <h3 className="video-card__title">{video.title}</h3>
                                <span className="video-card__tokens">
                                    <IoFlashOutline /> Consumes {video.tokens} tokens
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Video;
