
import React from 'react';
import type { Style } from './types';

// Generic Icon component for styling
const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {children}
    </svg>
);

export const STYLES: Style[] = [
    {
        id: 'kawaii',
        name: 'Kawaii',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></Icon>,
        promptModifier: '3D model render, ultra cute character, adorable, big expressive eyes, kawaii aesthetic, chibi style, character concept art',
    },
    {
        id: 'realistic',
        name: 'Realistic',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></Icon>,
        promptModifier: 'photorealistic 3D model render, hyperrealistic, 8k, detailed, studio lighting, octane render',
    },
    {
        id: 'anime',
        name: 'Anime',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></Icon>,
        promptModifier: '3D model in anime style, cel-shaded 3D render, vibrant colors, Japanese animation aesthetic, Genshin Impact style',
    },
    {
        id: 'low-poly',
        name: 'Low Poly',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></Icon>,
        promptModifier: 'low-poly 3D model, game asset, geometric shapes, simplified forms, vibrant flat colors',
    },
    {
        id: 'steampunk',
        name: 'Steampunk',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>,
        promptModifier: 'steampunk 3D model, victorian era, gears, cogs, copper and brass, intricate machinery, detailed 3D render',
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></Icon>,
        promptModifier: 'cyberpunk 3D model, futuristic, neon lights, high-tech, dystopian, detailed character render',
    },
    {
        id: 'cartoon',
        name: 'Cartoon',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>,
        promptModifier: '3D model in a classic cartoon style, Disney Infinity style, bold outlines, simple shapes, expressive, fun 3D render',
    },
    {
        id: 'fantasy',
        name: 'Fantasy',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.75 4a3.001 3.001 0 013.696 0l.401.346a1 1 0 001.306 0l.401-.346a3.001 3.001 0 013.696 0l.401.346a1 1 0 001.306 0l.401-.346a3.001 3.001 0 013.696 0" /></Icon>,
        promptModifier: 'epic fantasy 3D model, magical, mythical creatures, detailed character render, ZBrush sculpt, World of Warcraft style',
    },
    {
        id: 'minimalist',
        name: 'Minimalist',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></Icon>,
        promptModifier: 'minimalist 3D model, simple, clean lines, geometric, few colors, abstract 3D render',
    },
    {
        id: 'watercolor',
        name: 'Watercolor',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></Icon>,
        promptModifier: '3D model with a watercolor texture, stylized 3D render, soft edges, blended colors, artistic',
    },
    {
        id: 'pixel-art',
        name: 'Pixel Art',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M4 16v4h4M16 4h4v4M16 20h4v-4" /></Icon>,
        promptModifier: 'voxel art 3D model, pixel art aesthetic, 16-bit, retro gaming style, pixelated 3D render, MagicaVoxel style',
    },
    {
        id: 'claymation',
        name: 'Claymation',
        icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.771-2.59 6.96-6.066 7.828" /></Icon>,
        promptModifier: 'claymation style 3D model, stop motion, plasticine, textured, fingerprints visible, handcrafted look, Aardman animations style',
    },
];
