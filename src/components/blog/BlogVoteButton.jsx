"use client";

import React, { useState } from 'react';
import Icon from '@/components/icons/Icon';
import { knopfKlassen } from '@/components/kern/stile';

// Erfolg: Haken und Text, Fläche Fliese, Rahmen in Abnahme-Grün
const ERFOLG = 'inline-flex min-h-11 items-center gap-2 border border-abnahme bg-fliese px-6 py-3 font-text text-fs-2 font-semibold text-abnahme';

export default function BlogVoteButton() {
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setHasVoted(true)}
      disabled={hasVoted}
      className={hasVoted ? ERFOLG : knopfKlassen('neben')}
      data-motion="druck"
    >
      {hasVoted && <Icon name="haken" groesse={5} />}
      <span>{hasVoted ? 'Danke für Ihr Feedback!' : 'Ja, sehr hilfreich'}</span>
    </button>
  );
}
