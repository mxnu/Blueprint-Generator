
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 border-b-2 border-cyan-500 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
                <div className="text-3xl font-bold text-white tracking-wider">
                    3D Blueprint <span className="text-cyan-400">Generator</span>
                </div>
            </div>
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
                <p className="text-gray-400">An educational tool to create consistent blueprints for 3D modeling practice.</p>
            </div>
        </header>
    );
};
