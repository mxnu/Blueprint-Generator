
import React, { useState } from 'react';

interface ImageInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    onUpload: (base64: string) => void;
    isLoading: boolean;
}

export const ImageInput: React.FC<ImageInputProps> = ({ prompt, setPrompt, onGenerate, onUpload, isLoading }) => {
    const [activeTab, setActiveTab] = useState<'generate' | 'upload'>('generate');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    onUpload(event.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const TabButton: React.FC<{ tabId: 'generate' | 'upload'; children: React.ReactNode }> = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex-1 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 focus:outline-none ${
                activeTab === tabId
                    ? 'bg-gray-700 text-cyan-400 border-b-2 border-cyan-400'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div>
            <div className="flex border-b border-gray-600 mb-4">
                <TabButton tabId="generate">Generate with AI</TabButton>
                <TabButton tabId="upload">Upload Image</TabButton>
            </div>

            {activeTab === 'generate' && (
                <div className="space-y-4">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., a cute robot mascot"
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                        onClick={onGenerate}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                        Generate Image
                    </button>
                </div>
            )}

            {activeTab === 'upload' && (
                <div>
                     <label htmlFor="file-upload" className="w-full cursor-pointer bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center hover:border-cyan-500 hover:bg-gray-600 transition-colors">
                        <svg className="w-10 h-10 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414A1 1 0 0116.414 3H17a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path></svg>
                        <span className="text-gray-400 font-medium">Click to upload</span>
                        <span className="text-xs text-gray-500">PNG, JPG, WEBP</span>
                    </label>
                    <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
            )}
        </div>
    );
};
