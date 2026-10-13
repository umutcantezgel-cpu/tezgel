"use client";

// Auffangzustand der Schale (KERN v2, K-009): Fehlerhinweis wie kern/Hinweis.tsx bei art „fehler“ – Fläche Fliese, Rahmen
// und 2-px-Kante links in laser-tief, eckig, Versatz-Zeichen „fehler“ der eigenen Icon-Familie, Text und role="alert".
// „Erneut versuchen“ ist der Hauptknopf aus kern/stile.ts (data-motion="druck"), sein Zeichen „pfeil-links“ (zuordnung.ts).
// Elementstruktur, fallback-Prop, Zurücksetzen, Protokollierung und Wortlaut unverändert; nur Klassen aus dem Live-CSS.
import React, { Component, ErrorInfo, ReactNode } from "react";
import Icon from "@/components/icons/Icon";
import { knopfKlassen } from "@/components/kern/stile";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="mx-auto my-6 max-w-mass border border-l-2 border-laser-tief bg-fliese p-6 font-text text-fs-2 text-tinte"
        >
          <div className="flex">
            <Icon name="fehler" groesse={6} className="text-laser-tief" />
          </div>
          <h3 className="mt-4 text-fs-5">
            Ein unerwarteter Fehler ist aufgetreten
          </h3>
          <p className="mt-2">
            Dieser Abschnitt konnte leider nicht korrekt geladen werden.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className={knopfKlassen("haupt", "mt-6")}
            data-motion="druck"
          >
            <Icon name="pfeil-links" groesse={5} />
            <span>Erneut versuchen</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
