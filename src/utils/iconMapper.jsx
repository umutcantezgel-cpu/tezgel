import React from 'react';
import Icon from '@/components/icons/Icon';
import { ICON_NAMEN } from '@/components/icons/namen';
import { LUCIDE_ZUORDNUNG } from '@/components/icons/zuordnung';

// Icon zu einem Namen (KERN K-008, E-006). Komponenten aus den Config-Daten gehen unverändert durch;
// Namen – eigene oder bisherige lucide-Namen – laufen über die Zuordnung auf die eigene Familie.
// „entfällt“ in der Zuordnung ergibt kein Icon. Früher lud `import * as Icons` die ganze Bibliothek.
const komponenten = new Map();

function eigenesIcon(name) {
    if (!komponenten.has(name)) {
        const Komponente = function EigenesIcon({ className, 'aria-label': label }) {
            return <Icon name={name} className={className} label={label} />;
        };
        komponenten.set(name, Komponente);
    }
    return komponenten.get(name);
}

export const getIcon = (iconName) => {
    if (!iconName) return null;
    // If it's already a component (function/object), return it
    if (typeof iconName === 'function' || typeof iconName === 'object') return iconName;

    if (ICON_NAMEN.includes(iconName)) return eigenesIcon(iconName);
    const pascalCaseName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const schluessel = pascalCaseName in LUCIDE_ZUORDNUNG ? pascalCaseName : iconName;
    const ziel = LUCIDE_ZUORDNUNG[schluessel];
    if (ziel === null) return null;
    return eigenesIcon(ziel || 'info');
};

export const IconWrapper = React.memo(function IconWrapper({ name, ...props }) {
    const Icon = getIcon(name);
    return Icon ? React.createElement(Icon, props) : null;
});
