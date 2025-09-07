import React, { useEffect } from 'react';

interface ZoomModalProps {
    imageUrl: string;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}

const NavButton: React.FC<{ direction: 'left' | 'right'; onClick: () => void; disabled: boolean }> = ({ direction, onClick, disabled }) => (
    <button
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        disabled={disabled}
        className={`absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-0 disabled:cursor-default z-50
            ${direction === 'left' ? 'left-4' : 'right-4'}`}
        aria-label={direction === 'left' ? 'Previous image' : 'Next image'}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {direction === 'left' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
        </svg>
    </button>
);


export const ZoomModal: React.FC<ZoomModalProps> = ({ imageUrl, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
            if (event.key === 'ArrowRight' && hasNext) {
                onNext();
            }
            if (event.key === 'ArrowLeft' && hasPrev) {
                onPrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, onNext, onPrev, hasNext, hasPrev]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <NavButton direction="left" onClick={onPrev} disabled={!hasPrev} />

            <div 
                className="relative max-w-4xl max-h-[90vh] w-full h-full"
                onClick={(e) => e.stopPropagation()} 
            >
                <img 
                    src={imageUrl} 
                    alt="Zoomed view" 
                    className="object-contain w-full h-full"
                />
            </div>

            <NavButton direction="right" onClick={onNext} disabled={!hasNext} />

            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300 transition-colors focus:outline-none"
                aria-label="Close zoomed image"
            >
                &times;
            </button>
        </div>
    );
};
