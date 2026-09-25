"use client";

import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';

export default function BlogVoteButton() {
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setHasVoted(true)}
      disabled={hasVoted}
      className={`px-4 py-1.5 rounded-tile-sm text-xs font-black flex items-center gap-1.5 transition-all ${
        hasVoted
          ? 'bg-orange-600 text-white shadow-xs'
          : 'bg-white border border-neutral-300 text-neutral-700 hover:border-orange-600 hover:text-orange-800'
      }`}
    >
      <ThumbsUp className="w-3.5 h-3.5" />
      <span>{hasVoted ? 'Danke für Ihr Feedback!' : 'Ja, sehr hilfreich'}</span>
    </button>
  );
}
