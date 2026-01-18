'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2, X } from 'lucide-react';

const MENU_IMAGES = [
    '/MandiraHouse/images/menu-slider/Nasgor Cikur Babat Sapi.png',
    '/MandiraHouse/images/menu-slider/Short Plate DAging Sapi Saus Lada Hitam.png',
    '/MandiraHouse/images/menu-slider/Spagheti Bolognaise.png',
    '/MandiraHouse/images/menu-slider/Udang Sc Mentega.png',
];


const getImageName = (path: string) => {
    const filename = path.split('/').pop()?.split('.')[0] || '';
    return filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function EventSliderMenu({ onPauseChange, onNameChange }: { onPauseChange?: (isPaused: boolean) => void; onNameChange?: (name: string) => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = MENU_IMAGES.length - 1;
            if (nextIndex >= MENU_IMAGES.length) nextIndex = 0;
            return nextIndex;
        });
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                paginate(1);
            }, 5000); // Change image every 5 seconds (slow motion effect)
        }
        return () => clearInterval(interval);
    }, [isPlaying, paginate]);

    // Notify parent about pause state changes
    useEffect(() => {
        if (onPauseChange) {
            onPauseChange(!isPlaying);
        }
    }, [isPlaying, onPauseChange]);

    // Notify parent about current image name
    useEffect(() => {
        if (onNameChange) {
            onNameChange(getImageName(MENU_IMAGES[currentIndex]));
        }
    }, [currentIndex, onNameChange]);

    // Keyboard support for full screen
    useEffect(() => {
        if (!isFullScreen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'ArrowRight') paginate(1);
            if (e.key === 'Escape') setIsFullScreen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullScreen, paginate]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    // Shared Controls Component
    const Controls = ({ showMaximize = true }: { showMaximize?: boolean }) => (
        <div className={`absolute inset-x-0 bottom-0 p-6 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent ${showMaximize ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity duration-300 z-20`}>
            {/* Dots Indicator */}
            <div className="flex gap-2">
                {MENU_IMAGES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>

            {/* Play/Pause & Nav Buttons */}
            <div className="flex items-center gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                    }}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    title={isPlaying ? "Pause Slide" : "Play Slide"}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <div className="flex gap-1 ml-2">
                    {showMaximize && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFullScreen(true);
                            }}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                            title="Full Screen"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(-1);
                        }}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(1);
                        }}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div
            className="relative w-full h-full overflow-hidden group"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
        >
            {/* Full Screen Overlay Portal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isFullScreen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
                        >
                            <button
                                onClick={() => setIsFullScreen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[10000] cursor-pointer"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <div className="w-full h-full relative flex items-center justify-center p-4">
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.img
                                        key={currentIndex}
                                        src={MENU_IMAGES[currentIndex]}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.5 }
                                        }}
                                        className="absolute max-w-full max-h-full object-contain shadow-2xl"
                                        alt={getImageName(MENU_IMAGES[currentIndex])}
                                    />
                                </AnimatePresence>
                                <Controls showMaximize={false} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={MENU_IMAGES[currentIndex]}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 } // Smooth fade for slow motion feel
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute w-full h-full object-cover"
                    alt={getImageName(MENU_IMAGES[currentIndex])}
                />
            </AnimatePresence>

            <Controls showMaximize={true} />
        </div>
    );
}
