import Link from 'next/link';
export default function KernProbe() {
  return (
    <div className="p-k-6">
      <h1 className="k-anzeige text-k-7 tracking-[0.31em]">Probe Kern</h1>
      <p className="k-mono text-k-laser-tief" data-motion="auftritt" data-ausloeser="sicht">35614 Aßlar</p>
      <Link id="zu-bad" href="/bad">Zum Bad</Link>
    </div>
  );
}
