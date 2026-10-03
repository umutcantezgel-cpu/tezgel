import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Stale static export committed to the repo (not part of the source).
    "dist/**",
    "WhatsApp-Button-Export/**",
    "CookieConsentExport/**",
    "K-Aqua-Cursor-Animation/**",
    "Pipeline Kopie 5/**",
    "ms-reusable-components/**",
    "coday-seo-toolkit/**",
  ]),
]);

export default eslintConfig;
