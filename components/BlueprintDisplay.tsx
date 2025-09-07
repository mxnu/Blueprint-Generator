import React, { useRef, useEffect } from 'react';
import type { BlueprintViews } from '../types';

interface BlueprintDisplayProps {
    views: BlueprintViews;
    onZoom: (imageUrl: string) => void;
    onCombinedCanvasReady?: (dataUrl: string) => void;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const BlueprintView: React.FC<{ title: string; image: string | null; onDownload: () => void; onZoom: (imageUrl: string) => void; }> = ({ title, image, onDownload, onZoom }) => (
    <div className="flex flex-col items-center w-full">
        <h4 className="text-md font-semibold text-gray-400 mb-2">{title}</h4>
        <div 
            className={`w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 overflow-hidden transition-opacity ${image ? 'cursor-zoom-in hover:opacity-90' : ''}`}
            onClick={() => image && onZoom(image)}
        >
            {image ? <img src={image} alt={`${title} blueprint`} className="max-w-full max-h-full object-contain" /> : <p className="text-gray-500 text-sm">Not generated</p>}
        </div>
        {image && <button onClick={onDownload} className="mt-2 w-full flex items-center justify-center text-sm bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"><DownloadIcon/>Download</button>}
    </div>
);

export const BlueprintDisplay: React.FC<BlueprintDisplayProps> = ({ views, onZoom, onCombinedCanvasReady }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hasAllOrthoViews = views.front && views.right && views.left && views.top && views.back;

    const downloadImage = (dataUrl: string, filename: string) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (!hasAllOrthoViews || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const frontImg = new Image();
        const rightImg = new Image();
        const leftImg = new Image();
        const topImg = new Image();
        const backImg = new Image();

        let loadedCount = 0;
        const totalImages = 5;

        const onImageLoad = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                drawCanvas();
            }
        };

        const drawCanvas = () => {
            const size = 768;
            const padding = 12;
            const viewSize = (size - padding * 4) / 3;
            
            canvas.width = size;
            canvas.height = size;
            
            ctx.fillStyle = '#1f2937'; // bg-gray-800
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#4b5563'; // border-gray-600
            ctx.lineWidth = 2;

            // Layout: Standard T-cross orthographic projection
            //   [ ][Top][ ]
            // [L][Frt][Rgt]
            //   [ ][Bck][ ]
            const col = [
                padding,
                padding + viewSize + padding,
                padding + viewSize + padding + viewSize + padding,
            ];
            const row = [
                padding,
                padding + viewSize + padding,
                padding + viewSize + padding + viewSize + padding,
            ];

            const positions = {
                top:   { img: topImg,   x: col[1], y: row[0] },
                left:  { img: leftImg,  x: col[0], y: row[1] },
                front: { img: frontImg, x: col[1], y: row[1] },
                right: { img: rightImg, x: col[2], y: row[1] },
                back:  { img: backImg,  x: col[1], y: row[2] },
            };

            for (const key in positions) {
                const pos = positions[key as keyof typeof positions];
                ctx.drawImage(pos.img, pos.x, pos.y, viewSize, viewSize);
                ctx.strokeRect(pos.x, pos.y, viewSize, viewSize);
            }

            if (onCombinedCanvasReady) {
                onCombinedCanvasReady(canvas.toDataURL('image/png'));
            }
        };
        
        frontImg.onload = onImageLoad;
        rightImg.onload = onImageLoad;
        leftImg.onload = onImageLoad;
        topImg.onload = onImageLoad;
        backImg.onload = onImageLoad;

        frontImg.src = views.front!;
        rightImg.src = views.right!;
        leftImg.src = views.left!;
        topImg.src = views.top!;
        backImg.src = views.back!;

    }, [views, hasAllOrthoViews, onCombinedCanvasReady]);

    const handleDownloadCombined = () => {
        if (canvasRef.current) {
            downloadImage(canvasRef.current.toDataURL('image/png'), 'combined_blueprint.png');
        }
    };
    
    const handleCanvasZoom = () => {
        if (canvasRef.current) {
            onZoom(canvasRef.current.toDataURL('image/png'));
        }
    };

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <BlueprintView title="Front View" image={views.front} onDownload={() => downloadImage(views.front!, 'front_view.png')} onZoom={onZoom} />
                <BlueprintView title="Back View" image={views.back} onDownload={() => downloadImage(views.back!, 'back_view.png')} onZoom={onZoom} />
                <BlueprintView title="Top View" image={views.top} onDownload={() => downloadImage(views.top!, 'top_view.png')} onZoom={onZoom} />
                <BlueprintView title="Right Side View" image={views.right} onDownload={() => downloadImage(views.right!, 'right_side_view.png')} onZoom={onZoom} />
                <BlueprintView title="Left Side View" image={views.left} onDownload={() => downloadImage(views.left!, 'left_side_view.png')} onZoom={onZoom} />
            </div>

            {hasAllOrthoViews && (
                 <div className="flex flex-col items-center pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">Combined Blueprint</h3>
                    <canvas 
                        ref={canvasRef} 
                        className="w-full max-w-md aspect-square rounded-lg bg-gray-700 border-2 border-dashed border-gray-600 cursor-zoom-in transition-opacity hover:opacity-90"
                        onClick={handleCanvasZoom}
                    ></canvas>
                    <button onClick={handleDownloadCombined} className="mt-4 w-full max-w-md flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"><DownloadIcon/>Download Combined</button>
                </div>
            )}
        </div>
    );
};