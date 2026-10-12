"use client";
import React from 'react';
import Image from 'next/image';
import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { FacebookLogo, TwitterLogo, LinkedinLogo } from '@/components/ui/Markenlogos';
import { COMPANY_DATA } from '@/config/company';

/** Umschlag für E-Mail-Profile, aus der eigenen Icon-Familie */
const MailZeichen = ({ className }) => <Icon name="mail" groesse={5} className={className} />;

/**
 * Blog Author Card Component
 * Displays author information with avatar, bio, and social links.
 * Posts by the company show Fliesenverlegung Tezgel (owner + chamber data);
 * editorial posts ("Ratgeber-Redaktion") stay neutral without company attribution.
 */
const BlogAuthorCard = ({ author }) => {
    if (!author) return null;

    const socialIcons = {
        twitter: TwitterLogo,
        linkedin: LinkedinLogo,
        facebook: FacebookLogo,
        email: MailZeichen
    };

    // Normalize author data if it's just a string name
    const rawAuthor = typeof author === 'string' ? { name: author } : author;
    const isCompanyAuthor = rawAuthor.name === COMPANY_DATA.legalName;

    const authorData = isCompanyAuthor
        ? {
            name: COMPANY_DATA.legalName,
            title: `${COMPANY_DATA.owner.fullName} · ${COMPANY_DATA.owner.title}`,
            bio: `${COMPANY_DATA.authority.certification} – ${COMPANY_DATA.authority.responsibility} mit Sitz in ${COMPANY_DATA.headquarters.city}.`
        }
        : rawAuthor;

    return (
        <div className="border border-fuge bg-fliese p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col gap-6 md:flex-row">
                {/* Avatar: beim Betrieb das Logo (dieselbe Datei und Alt-Text wie im Kopf) statt eines Monogramms */}
                <div className="shrink-0">
                    {authorData.avatar ? (
                        <Image
                            src={authorData.avatar}
                            alt={authorData.name}
                            width={96}
                            height={96}
                            sizes="96px"
                            className="size-24 border border-fuge object-cover"
                        />
                    ) : isCompanyAuthor ? (
                        <div className="flex h-24 w-32 items-center justify-center border border-fuge bg-fliese p-2">
                            <Image
                                src="/images/logo/tezgel-logo.webp"
                                alt="Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar"
                                width={140}
                                height={44}
                                className="h-auto w-full object-contain"
                            />
                        </div>
                    ) : (
                        <div
                            className="flex size-24 items-center justify-center bg-tinte font-anzeige text-fs-5 text-kalk"
                            aria-hidden="true"
                        >
                            {authorData.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <p className={etikettKlassen}>Verfasst von</p>
                    <h3 className="mt-2 text-fs-4 text-tinte">
                        {authorData.name}
                    </h3>

                    {authorData.title && (
                        <p className="mt-1 text-fs-2 font-semibold text-tinte">
                            {authorData.title}
                        </p>
                    )}

                    {authorData.bio && (
                        <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                            {authorData.bio}
                        </p>
                    )}

                    {isCompanyAuthor && (
                        <div className="mt-6">
                            <Knopf variante="text" href="/ueber-uns" icon="pfeil-rechts">
                                Mehr über {COMPANY_DATA.owner.fullName}
                            </Knopf>
                        </div>
                    )}

                    {/* Social Links */}
                    {authorData.social && Object.keys(authorData.social).length > 0 && (
                        <div className="mt-6 flex gap-3">
                            {Object.entries(authorData.social).map(([platform, url]) => {
                                const Zeichen = socialIcons[platform] || MailZeichen;
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex size-11 items-center justify-center border border-strich text-tinte hover:border-tinte"
                                        data-motion="zustand"
                                        aria-label={platform}
                                    >
                                        <Zeichen className="size-5" />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogAuthorCard;
