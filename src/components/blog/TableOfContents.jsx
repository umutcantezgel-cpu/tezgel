"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { List } from 'lucide-react';

const TableOfContents = ({ content }) => {
    const [activeId, setActiveId] = useState('');

    const headings = useMemo(() => {
        const lines = (content ?? '').split('\n');
        return lines
            .filter(line => line.trim().startsWith('## ') || line.trim().startsWith('### '))
            .map(line => {
                const trimmedLine = line.trim();
                const level = trimmedLine.match(/^#+/)[0].length;
                const text = trimmedLine.replace(/^#+\s+/, '');
                const plainText = text.replace(/[*_\[\]()]+/g, '');
                const id = plainText.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-').replace(/(^-|-$)+/g, '');
                return { id, text, level };
            });
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div>
            <h2 className="flex items-center gap-2 font-black text-slate-900 mb-4 text-sm uppercase tracking-wider">
                <List className="w-4 h-4 text-emerald-600" />
                Inhalt
            </h2>
            <nav aria-label="Inhaltsverzeichnis" className="space-y-1 relative">
                {/* Active Indicator Line matches list height via CSS or direct styling */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 rounded-full" />

                {headings.map(({ id, text, level }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                            setActiveId(id);
                        }}
                        aria-current={activeId === id ? 'location' : undefined}
                        className={`block text-sm py-2 pl-4 border-l-2 transition-all duration-300 ${activeId === id
                            ? 'border-emerald-600 text-emerald-800 font-bold -ml-[2px]'
                            : 'border-transparent text-slate-700 hover:text-slate-900 hover:border-slate-300 -ml-[2px]'
                            }`}
                        style={{ marginLeft: level === 3 ? '1rem' : '0' }}
                    >
                        {text}
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default TableOfContents;
