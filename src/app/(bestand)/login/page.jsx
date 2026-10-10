"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PageWrapper from '@/components/common/PageWrapper';

const inputClass =
    'w-full pl-10 pr-4 py-3 rounded-tile-sm bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-all';

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
        <PageWrapper title="Admin Login">
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 pt-32 pb-16 relative overflow-hidden">
                <div className="ambient-glow-orange -top-20 -left-20 opacity-60" />
                <div className="w-full max-w-md relative z-10">
                    {/* Login Card */}
                    <div className="ceramic-hero rounded-tile-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <span className="icon-chip w-16 h-16 rounded-tile-pill mx-auto mb-4">
                                <Lock className="w-8 h-8" />
                            </span>
                            <h1 className="text-2xl font-black text-slate-900 mb-2">
                                Mitarbeiter Login
                            </h1>
                            <p className="text-slate-700 text-sm">
                                Melden Sie sich an, um den Admin-Bereich zu betreten
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-tile-sm flex items-center gap-3 text-red-800" role="alert">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username*/}
                            <div>
                                <label htmlFor="login-username" className="block text-sm font-bold text-slate-800 mb-2">
                                    Benutzername
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" aria-hidden="true" />
                                    <input
                                        id="login-username"
                                        type="text"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={inputClass}
                                        placeholder="Benutzername eingeben"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="login-password" className="block text-sm font-bold text-slate-800 mb-2">
                                    Passwort
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" aria-hidden="true" />
                                    <input
                                        id="login-password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="Passwort eingeben"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" disabled={isLoading} className="btn-primary w-full">
                                {isLoading ? 'Anmeldung läuft …' : 'Anmelden'}
                            </button>
                        </form>

                        {/* Footer Note */}
                        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                            <p className="text-xs text-slate-600">
                                Nur für autorisierte Mitarbeiter
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Login;
