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

// Namen wie im Seitentext `_werkstatt/texte/blog.md` (K-010: „und“ statt „&“; Abnahme E3-BAU-11); Kennungen unverändert
export const categories = [
    { id: 'all', name: 'Alle Artikel', icon: LayoutGrid },
    { id: 'bad', name: 'Bad und Dusche', icon: Droplets },
    { id: 'fliesen', name: 'Fliesen und Material', icon: Grid3x3 },
    { id: 'untergrund', name: 'Untergrund und Abdichtung', icon: ShieldCheck },
    { id: 'aussen', name: 'Balkon und Terrasse', icon: Sun },
    { id: 'pflege', name: 'Pflege und Wert erhalten', icon: Sparkles },
    { id: 'ratgeber', name: 'Ratgeber und Kosten', icon: BookOpen },
    { id: 'news', name: 'Neuigkeiten', icon: Newspaper }
];
