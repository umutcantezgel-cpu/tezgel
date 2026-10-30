"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, liesInhalt } from '@/services/inhaltLesen';

const ContentContext = createContext(null);

// Nur, was die Leser unter /blog nutzen (UM-E4-LEISTUNG, Maßnahme 3): Kategorien und Beiträge, wie vorher zuerst aus den
// Überschreibungen in localStorage, sonst aus den Vorgaben. Die Vorgaben reicht die Serverseite (blog/page.jsx) herein:
// dieselben Werte wie dataService.getBlogCategories() und getBlogPosts(), die Beiträge ohne ihren Text (content), den kein
// Leser der Liste braucht. Die übrigen Felder (siteConfig, services, company, projects, team, settings) las kein Verbraucher
// (useBlogListe, BlogCard, BlogSidebar); sie brachten Firmen-, Leistungs-, Projekt- und Teamdaten ins Bündel von /blog.
const readBlogContent = (vorgaben) => ({
    blogCategories: liesInhalt(STORAGE_KEYS.BLOG_CATEGORIES, vorgaben.blogCategories),
    blogPosts: liesInhalt(STORAGE_KEYS.BLOG_POSTS, vorgaben.blogPosts),
    loading: false
});

// Schreiben über dataService (Vorgaben und Prüfschema mit zod) erst beim ersten Schreiben laden; die Funktionen geben wie
// vorher nichts zurück, der neue Stand kommt wie vorher über das Ereignis content-updated.
const withDataService = (task) => {
    import('@/services/dataService').then(({ dataService }) => task(dataService));
};

export const ContentProvider = ({ children, vorgaben }) => {
    const [content, setContent] = useState(readBlogContent(vorgaben));

    const refreshContent = () => {
        setContent(readBlogContent(vorgaben));
    };

    useEffect(() => {
        // Listen for updates (from Admin or other tabs); liest wie refreshContent (die Vorgaben sind fest, aus blog/page.jsx)
        const handleUpdate = () => setContent(readBlogContent(vorgaben));
        window.addEventListener('content-updated', handleUpdate);

        // Also listen for storage events (cross-tab sync)
        window.addEventListener('storage', handleUpdate);

        return () => {
            window.removeEventListener('content-updated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, [vorgaben]);

    const updateContent = (key, data) => {
        withDataService((dataService) => dataService.save(key, data));
        // State update happens via event listener to ensure consistency
    };

    const resetContent = (key) => {
        withDataService((dataService) => dataService.reset(key));
    };

    const clearAllContent = () => {
        withDataService((dataService) => dataService.clearAll());
    };

    const value = {
        ...content,
        updateContent,
        resetContent,
        clearAllContent,
        refreshContent
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
