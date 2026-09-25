"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '@/services/dataService';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState({
        siteConfig: dataService.getSiteConfig(),
        services: dataService.getServices(),
        company: dataService.getCompany(),
        projects: dataService.getProjects(),
        blogCategories: dataService.getBlogCategories(),
        blogPosts: dataService.getBlogPosts(),
        team: dataService.getTeam(),
        settings: dataService.getSettings(),
        loading: false
    });

    const refreshContent = () => {
        setContent({
            siteConfig: dataService.getSiteConfig(),
            services: dataService.getServices(),
            company: dataService.getCompany(),
            projects: dataService.getProjects(),
            blogCategories: dataService.getBlogCategories(),
            blogPosts: dataService.getBlogPosts(),
            team: dataService.getTeam(),
            settings: dataService.getSettings(),
            loading: false
        });
    };

    useEffect(() => {
        // Listen for updates (from Admin or other tabs)
        const handleUpdate = () => refreshContent();
        window.addEventListener('content-updated', handleUpdate);

        // Also listen for storage events (cross-tab sync)
        window.addEventListener('storage', handleUpdate);

        return () => {
            window.removeEventListener('content-updated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    const updateContent = (key, data) => {
        dataService.save(key, data);
        // State update happens via event listener to ensure consistency
    };

    const resetContent = (key) => {
        dataService.reset(key);
    };

    const clearAllContent = () => {
        dataService.clearAll();
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
