import { notFound } from 'next/navigation';
export function generateStaticParams() { return [{ slug: 'a' }]; }
export default async function P({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== 'a') notFound();
  return <p className="p-k-4">Probe {slug}</p>;
}
