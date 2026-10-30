# Discapp

Browser-based tools for Discord communities, built with Next.js App Router, React, and TypeScript. Most media editing runs locally in the browser; lookup, CAPTCHA, bug-report, and webhook features use API routes and third-party services.

## Development

Requires Node.js 20.9+ and npm. Install dependencies and use the scripts in `package.json` for development, linting, tests, and production builds.

Copy `.env.example` to `.env.local` and provide credentials for the services you need. The app can run without them, but dependent features will be unavailable.

| Variable | Used for | Notes |
| --- | --- | --- |
| `DISCAPP_TOKEN` | Discord User Lookup | Server-only Discord bot token. |
| `HCAPTCHA_SECRET_KEY` | CAPTCHA verification | Server-only hCaptcha secret used by User Lookup and bug reports. |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | CAPTCHA widget | Public hCaptcha site key; it is included in browser code and is not a secret. |
| `BUG_HOOK` | Bug reports | Server-only Discord webhook URL that receives reports. |

Keep secrets out of source control and `NEXT_PUBLIC_` variables. Only the hCaptcha site key is public; configure the remaining values as server-side environment variables. `.env.local` is ignored by Git.

Tests use Vitest and React Testing Library, with `*.test.ts` and `*.test.tsx` files alongside the source.

## Deployment

Deploy through the connected Vercel project and configure environment variables per environment. `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` is embedded at build time.

See [LICENCE.md](LICENCE.md) for repository usage and contribution terms.
