'use client';

// Vorschau P3-03: Absenden ohne Netz (kein POST) – zeigt Verzug 300 ms, Mindestanzeige 500 ms und den Erfolg.
import { useRef, useState, type FormEvent } from 'react';
import { Feld, Hinweis, SendeKnopf } from '@/components/kern/basis';

// mitFeld: Formular mit genau einem Feld – Enter darin sendet implizit; während des Sendens muss das gesperrt sein.
export function SendeProbe({ dauer, kennung, mitFeld = false }: { dauer: number; kennung: string; mitFeld?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const zeitgeber = useRef<number | undefined>(undefined);

  const senden = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.clearTimeout(zeitgeber.current);
    setStatus('submitting');
    zeitgeber.current = window.setTimeout(() => setStatus('success'), dauer);
  };

  return (
    <form onSubmit={senden} noValidate className="flex flex-col items-start gap-k-4" aria-label={kennung}>
      {mitFeld ? <Feld beschriftung="Telefonnummer" art="tel" name="phone-probe" placeholder="Für den Rückruf" className="w-full" /> : null}
      <SendeKnopf sendet={status === 'submitting'}>Anfrage senden</SendeKnopf>
      {status === 'success' ? (
        <Hinweis art="erfolg" titel="Notiert.">
          Ihre Anfrage für Badsanierung ist direkt bei Herrn Deniz Tezgel eingegangen.
        </Hinweis>
      ) : null}
    </form>
  );
}
