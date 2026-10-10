'use client';

// Vorschau P3-03: Absenden ohne Netz (kein POST) – zeigt Verzug 300 ms, Mindestanzeige 500 ms und den Erfolg.
import { useRef, useState, type FormEvent } from 'react';
import { Hinweis, SendeKnopf } from '@/components/kern/basis';

export function SendeProbe({ dauer, kennung }: { dauer: number; kennung: string }) {
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
      <SendeKnopf sendet={status === 'submitting'}>Anfrage senden</SendeKnopf>
      {status === 'success' ? (
        <Hinweis art="erfolg" titel="Notiert.">
          Ihre Anfrage für Badsanierung ist direkt bei Herrn Deniz Tezgel eingegangen.
        </Hinweis>
      ) : null}
    </form>
  );
}
