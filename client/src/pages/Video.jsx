import { IoVideocamOutline, IoFlashOutline, IoTimeOutline, IoPlayOutline } from 'react-icons/io5';

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
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Video</h1>
                <p className="text-[15px] text-secondary-text font-normal">Manage your video content and track usage.</p>
            </div>

            {VIDEOS.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center card-base">
                    <div className="text-5xl text-secondary-text/60 mb-4">
                        <IoVideocamOutline />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">No videos yet</h3>
                    <p className="text-sm text-secondary-text">Content will appear here once you start creating videos.</p>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                    {VIDEOS.map((video, i) => {
                        const thumbColors = {
                            '--purple': 'bg-linear-[135deg,rgba(130,4,255,0.2),rgba(168,85,247,0.1)]',
                            '--blue': 'bg-linear-[135deg,rgba(59,130,246,0.2),rgba(96,165,250,0.1)]',
                            '--green': 'bg-linear-[135deg,rgba(16,185,129,0.2),rgba(52,211,153,0.1)]',
                            '--orange': 'bg-linear-[135deg,rgba(245,158,11,0.2),rgba(251,191,36,0.1)]',
                            '--cyan': 'bg-linear-[135deg,rgba(6,182,212,0.2),rgba(103,232,249,0.1)]',
                            '--red': 'bg-linear-[135deg,rgba(239,68,68,0.2),rgba(248,113,113,0.1)]'
                        };
                        return (
                            <div className="card-base !p-0 overflow-hidden group" key={i}>
                                <div className={`relative w-full h-[180px] flex items-center justify-center ${thumbColors[video.color]}`}>
                                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-[26px] text-primary-text transition-all duration-200 group-hover:scale-110 group-hover:bg-white/25">
                                        <IoPlayOutline />
                                    </div>
                                    <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/60 text-white px-2.5 py-1 rounded-md text-[12px] font-medium">
                                        <IoTimeOutline /> {video.duration}
                                    </span>
                                </div>
                                <div className="p-[18px_20px]">
                                    <h3 className="text-[15px] font-semibold text-primary-text mb-2">{video.title}</h3>
                                    <span className="flex items-center gap-1.5 text-[13px] text-[#f59e0b] font-medium">
                                        <IoFlashOutline /> Consumes {video.tokens} tokens
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Video;
