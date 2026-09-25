"use client";
import React, { useEffect } from 'react';
import Script from 'next/script';
import { useConsent } from '@/components/common/ConsentManager';

const TrackingScripts = () => {
    const { preferences } = useConsent();

    // Check if we have consent for specific categories
    const analyticsConsent = preferences?.analytics;
    const marketingConsent = preferences?.marketing;

    // Placeholder IDs - User needs to provide these
    const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
    const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

    useEffect(() => {
        // Initialize Meta Pixel if consent is given and real ID is configured
        if (marketingConsent && META_PIXEL_ID) {
            (function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                    if (n.callMethod) {
                        n.callMethod.apply(n, arguments);
                    } else {
                        n.queue.push(arguments);
                    }
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', META_PIXEL_ID);
            window.fbq('track', 'PageView');
        }
    }, [marketingConsent, META_PIXEL_ID]);

    return (
        <>
            {/* Google Analytics 4 Script - Loaded via lazyOnload during idle time */}
            {analyticsConsent && GA4_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
                        strategy="lazyOnload"
                    />
                    <Script id="ga4-init" strategy="lazyOnload">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA4_ID}', {
                                page_path: window.location.pathname,
                            });
                        `}
                    </Script>
                </>
            )}
        </>
    );
};

export default TrackingScripts;
