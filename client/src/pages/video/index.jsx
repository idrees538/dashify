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
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Video</h1>
                <p className="text-[15px] text-text-secondary font-normal">Manage your video content and track usage.</p>
            </div>

            {VIDEOS.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 px-8 text-center bg-bg-secondary rounded-xl shadow-sm border border-border-color">
                    <div className="text-5xl text-text-secondary/60 mb-4">
                        <IoVideocamOutline />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">No videos yet</h3>
                    <p className="text-sm text-text-secondary">Content will appear here once you start creating videos.</p>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                    {VIDEOS.map((video, i) => {
                        const gradientMap = {
                            '--purple': 'from-accent/20 to-accent/10',
                            '--blue': 'from-blue-500/20 to-blue-500/10',
                            '--green': 'from-[#10B981]/20 to-[#10B981]/10',
                            '--orange': 'from-[#F59E0B]/20 to-[#F59E0B]/10',
                            '--cyan': 'from-[#06B6D4]/20 to-[#06B6D4]/10',
                            '--red': 'from-[#EF4444]/20 to-[#EF4444]/10',
                        };
                        const gradientClass = gradientMap[video.color] || 'from-gray-500/20 to-gray-500/10';

                        return (
                            <div className="group bg-bg-secondary rounded-xl shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 overflow-hidden" key={i}>
                                <div className={`relative w-full h-[180px] flex items-center justify-center bg-gradient-to-br ${gradientClass}`}>
                                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-[26px] text-text-primary transition-all duration-200 group-hover:scale-110 group-hover:bg-white/25">
                                        <IoPlayOutline />
                                    </div>
                                    <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/60 text-white px-2.5 py-1 rounded-md text-[12px] font-medium">
                                        <IoTimeOutline /> {video.duration}
                                    </span>
                                </div>
                                <div className="p-[18px] px-5">
                                    <h3 className="text-[15px] font-semibold text-text-primary mb-2">{video.title}</h3>
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
