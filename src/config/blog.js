import {
    LayoutGrid,
    Droplets,
    Grid3x3,
    Sun,
    BookOpen
} from 'lucide-react';

// Namen wie im Seitentext `_werkstatt/texte/blog.md` (K-010: „und“ statt „&“; Abnahme E3-BAU-11); seit E4-W0-BLOG (E-062)
// vier Themen statt sieben (untergrund zu bad, pflege zu fliesen, news zu ratgeber); Kennungen der übrigen unverändert
export const categories = [
    { id: 'all', name: 'Alle Artikel', icon: LayoutGrid },
    { id: 'bad', name: 'Bad und Dusche', icon: Droplets },
    { id: 'fliesen', name: 'Fliesen und Pflege', icon: Grid3x3 },
    { id: 'aussen', name: 'Balkon und Terrasse', icon: Sun },
    { id: 'ratgeber', name: 'Ratgeber und Neuigkeiten', icon: BookOpen }
];
