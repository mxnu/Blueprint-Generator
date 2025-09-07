import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { StyleSelector } from './components/StyleSelector';
import { ImageInput } from './components/ImageInput';
import { BlueprintDisplay } from './components/BlueprintDisplay';
import { Loader } from './components/Loader';
import { ZoomModal } from './components/ZoomModal';
import { STYLES } from './constants';
import type { Style, BlueprintViews } from './types';
import { generateImage, generateBlueprintView, applyStyleToImage } from './services/geminiService';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('a cute robot mascot');
    const [selectedStyle, setSelectedStyle] = useState<Style>(STYLES[0]);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [blueprintViews, setBlueprintViews] = useState<BlueprintViews>({ front: null, right: null, left: null, top: null, back: null });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
    const [combinedBlueprint, setCombinedBlueprint] = useState<string | null>(null);

    const handleImageUpload = (base64Image: string) => {
        setOriginalImage(base64Image);
        setSourceImage(null);
        setBlueprintViews({ front: null, right: null, left: null, top: null, back: null });
        setError(null);
    };

    const handleGenerateSourceImage = useCallback(async () => {
        if (!prompt) {
            setError('Please enter a prompt to generate an image.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage('Generating source image...');
        setError(null);
        setOriginalImage(null);
        setSourceImage(null);
        setBlueprintViews({ front: null, right: null, left: null, top: null, back: null });

        try {
            const fullPrompt = `${prompt}, ${selectedStyle.promptModifier}`;
            const imageB64 = await generateImage(fullPrompt);
            setSourceImage(`data:image/jpeg;base64,${imageB64}`);
        } catch (err) {
            console.error(err);
            setError('Failed to generate image. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [prompt, selectedStyle]);

    const handleApplyStyle = useCallback(async () => {
        if (!originalImage) {
            setError('Please upload an image first.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage('Applying style to your image...');
        setError(null);
        setSourceImage(null);

        try {
            const imageB64 = originalImage.split(',')[1];
            const mimeType = originalImage.split(';')[0].split(':')[1];
            const styledImageB64 = await applyStyleToImage(imageB64, mimeType, selectedStyle.promptModifier);
            if (styledImageB64) {
                 setSourceImage(`data:image/png;base64,${styledImageB64}`);
            } else {
                throw new Error("The model did not return a styled image.");
            }
        } catch (err) {
            console.error(err);
            setError('Failed to apply style. The model might be unable to process this image.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [originalImage, selectedStyle]);

    const handleGenerateBlueprints = useCallback(async () => {
        if (!sourceImage) {
            setError('Please generate or upload and style an image first.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage('Generating 5 blueprint views (this may take a moment)...');
        setError(null);
        setBlueprintViews({ front: null, right: null, left: null, top: null, back: null });

        try {
            const imageB64 = sourceImage.split(',')[1];
            const mimeType = sourceImage.split(';')[0].split(':')[1];
            
            const [front, right, left, top, back] = await Promise.all([
                generateBlueprintView(imageB64, mimeType, 'front view'),
                generateBlueprintView(imageB64, mimeType, 'side view (right)'),
                generateBlueprintView(imageB64, mimeType, 'side view (left)'),
                generateBlueprintView(imageB64, mimeType, 'top view'),
                generateBlueprintView(imageB64, mimeType, 'back view'),
            ]);

            setBlueprintViews({
                front: front ? `data:image/png;base64,${front}` : null,
                right: right ? `data:image/png;base64,${right}` : null,
                left: left ? `data:image/png;base64,${left}` : null,
                top: top ? `data:image/png;base64,${top}` : null,
                back: back ? `data:image/png;base64,${back}` : null,
            });

        } catch (err) {
            console.error(err);
            setError('Failed to generate blueprints. The model might be unable to process this image.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [sourceImage]);

    const displayImage = sourceImage || originalImage;
    const displayImageTitle = sourceImage ? 'Styled Source Image' : 'Uploaded Image';

    const orderedBlueprintViews = [
        blueprintViews.front,
        blueprintViews.back,
        blueprintViews.top,
        blueprintViews.right,
        blueprintViews.left,
    ];

    const allImages = useMemo(() => {
        const images = [displayImage, ...orderedBlueprintViews, combinedBlueprint].filter((img): img is string => !!img);
        return images;
    }, [displayImage, blueprintViews, combinedBlueprint]);
    
    const handleZoom = (imageUrl: string) => {
        const index = allImages.findIndex(img => img === imageUrl);
        if (index !== -1) {
            setZoomedImageIndex(index);
        }
    };

    const handleCloseZoom = () => setZoomedImageIndex(null);

    const handleNextImage = () => {
        if (zoomedImageIndex !== null && zoomedImageIndex < allImages.length - 1) {
            setZoomedImageIndex(zoomedImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (zoomedImageIndex !== null && zoomedImageIndex > 0) {
            setZoomedImageIndex(zoomedImageIndex - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Control Panel */}
                    <div className="lg:col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-400">1. Create Your Model</h2>
                        <ImageInput
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onGenerate={handleGenerateSourceImage}
                            onUpload={handleImageUpload}
                            isLoading={isLoading}
                        />

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-cyan-400">Style</h3>
                        <StyleSelector styles={STYLES} selectedStyle={selectedStyle} onSelect={setSelectedStyle} />

                        {originalImage && (
                             <div className="mt-6 pt-6 border-t border-gray-700">
                                <button
                                    onClick={handleApplyStyle}
                                    disabled={isLoading || !originalImage}
                                    className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 shadow-md"
                                >
                                    Apply Style to Uploaded Image
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-8 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 relative">
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="text-2xl font-bold text-cyan-400">2. Generate Blueprints</h2>
                             <button
                                onClick={handleGenerateBlueprints}
                                disabled={!sourceImage || isLoading}
                                className="px-6 py-2 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
                            >
                                Generate Blueprints
                            </button>
                        </div>
                       
                        {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>}

                        {isLoading && <Loader message={loadingMessage} />}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                             <div className="flex flex-col items-center">
                                <h3 className="text-lg font-semibold mb-2 text-gray-400">{displayImage ? displayImageTitle : 'Source Image'}</h3>
                                <div 
                                    className={`w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 transition-opacity ${displayImage ? 'cursor-zoom-in hover:opacity-90' : ''}`}
                                    onClick={() => displayImage && handleZoom(displayImage)}
                                >
                                    {displayImage ? (
                                        <img src={displayImage} alt="Source for blueprint" className="max-w-full max-h-full object-contain rounded-lg" />
                                    ) : (
                                        <p className="text-gray-500">Generate or upload an image</p>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-1">
                                <BlueprintDisplay 
                                    views={blueprintViews} 
                                    onZoom={handleZoom} 
                                    onCombinedCanvasReady={setCombinedBlueprint}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            {zoomedImageIndex !== null && (
                <ZoomModal 
                    imageUrl={allImages[zoomedImageIndex]} 
                    onClose={handleCloseZoom}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                    hasNext={zoomedImageIndex < allImages.length - 1}
                    hasPrev={zoomedImageIndex > 0}
                />
            )}
        </div>
    );
};

export default App;
