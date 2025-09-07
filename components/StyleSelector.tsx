
import React from 'react';
import type { Style } from '../types';

interface StyleSelectorProps {
    styles: Style[];
    selectedStyle: Style;
    onSelect: (style: Style) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelect }) => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {styles.map((style) => (
                <button
                    key={style.id}
                    onClick={() => onSelect(style)}
                    className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                        selectedStyle.id === style.id
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                            : 'bg-gray-700 border-gray-600 hover:border-cyan-600 hover:bg-gray-600 text-gray-300'
                    }`}
                >
                    <div className="mb-1">{style.icon}</div>
                    <span className="text-xs text-center">{style.name}</span>
                </button>
            ))}
        </div>
    );
};
