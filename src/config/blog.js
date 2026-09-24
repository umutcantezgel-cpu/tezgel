import {
    LayoutGrid,
    Droplets,
    Grid3x3,
    Sun,
    ShieldCheck,
    Sparkles,
    BookOpen,
    Newspaper
} from 'lucide-react';

export const categories = [
    { id: 'all', name: 'Alle Artikel', icon: LayoutGrid },
    { id: 'bad', name: 'Bad & Dusche', icon: Droplets },
    { id: 'fliesen', name: 'Fliesen & Material', icon: Grid3x3 },
    { id: 'untergrund', name: 'Untergrund & Abdichtung', icon: ShieldCheck },
    { id: 'aussen', name: 'Balkon & Terrasse', icon: Sun },
    { id: 'pflege', name: 'Pflege & Werterhalt', icon: Sparkles },
    { id: 'ratgeber', name: 'Ratgeber & Kosten', icon: BookOpen },
    { id: 'news', name: 'Neuigkeiten', icon: Newspaper }
];
