"use client";
// Mitarbeiter-Login (S-27 · E6-BAU-08, KERN v2): Arbeitsansicht als ruhiges Formular nach _formularregeln.md. Kompakter Einstieg
// mit H1 und Vorspann, rechts daneben (mobil darunter) das Formularfeld: Fehlermeldung, Benutzername, Passwort, Anmelden und der
// Hinweis in Mono an der Fuge. Beschriftung über dem Feld, Felder ohne eingelegte Icons, Fehler mit Fehler-Icon, Text und
// role="alert", Ladezustand über den Knopf (Text „Anmeldung läuft …“ wie im Bestand). Ohne die frühere Seitenhülle mit
// Einblendung (keine Register-Bewegung; Arbeitsansichten bewegen nur Rückmeldung und Zustand).
// Anmeldelogik, Felder, IDs, autocomplete, Platzhalter, Meldungen und Weiterleitung unverändert; Metadaten in ./layout.tsx.
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import { feldKlassen, labelKlassen } from '@/components/kern/stile';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Local loading state for form
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true); // Set loading to true

        try {
            const success = await login(username, password); // Await the login call
            if (success) {
                router.push('/admin'); // Navigate to /admin on success
            } else {
                setError('Ungültige Anmeldedaten'); // Set error on login failure
                setPassword(''); // Clear password on failed login attempt
            }
        } catch {
            setError('Ein Fehler ist aufgetreten'); // Generic error for network/server issues
            setPassword(''); // Clear password on any error
        } finally {
            setIsLoading(false); // Always set loading to false
        }
    };

    return (
        <Einstieg
            art="arbeit"
            titel="Mitarbeiter Login"
            vorspann={<p>Melden Sie sich an, um den Admin-Bereich zu betreten</p>}
            rand={
                // Formularfeld an der Fuge (vormals Karte mit Schloss-Kachel); ein Hauptknopf. Auf dem Tablett zwei Drittel breit
                // (sonst liefen zwei Felder über die volle Satzbreite), ab lg füllt es die Randspalte
                <div className="border border-fuge bg-fliese p-6 md:w-2/3 lg:w-full lg:p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 flex items-start gap-3 border-l-2 border-laser bg-kalk p-4 font-text text-fs-2 text-tinte" role="alert">
                            <Icon name="fehler" groesse={5} className="mt-px text-laser-tief" />
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Username*/}
                        <div>
                            <label htmlFor="login-username" className={labelKlassen}>
                                Benutzername
                            </label>
                            <input
                                id="login-username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={feldKlassen}
                                placeholder="Benutzername eingeben"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="login-password" className={labelKlassen}>
                                Passwort
                            </label>
                            <input
                                id="login-password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={feldKlassen}
                                placeholder="Passwort eingeben"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Knopf type="submit" laedt={isLoading} ladeText="Anmeldung läuft …" className="w-full">
                            Anmelden
                        </Knopf>
                    </form>

                    {/* Footer Note */}
                    <p className="mt-6 flex items-center gap-2 border-t border-fuge pt-6 font-mono text-fs-1 text-tinte-2">
                        <Icon name="schloss" groesse={4} />
                        Nur für autorisierte Mitarbeiter
                    </p>
                </div>
            }
        />
    );
};

export default Login;
