// Bindet test/resolver.mjs als Lade-Hook ein (`node --import ./test/register-hooks.mjs`),
// statt des veralteten `--loader` (Node 24, UM-E2-U01).
import { register } from 'node:module';

register('./resolver.mjs', import.meta.url);
