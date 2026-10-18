# AMONG API

Backend REST API for **AMONG**, built with NestJS, TypeScript, and Node.js.

---

## 1. Prerequisites
- Node.js LTS (v20+ or v24+)
- npm v10+

---

## 2. Installation

From the monorepo root:
```bash
npm install
```

---

## 3. Environment Variables

Create `.env` in `apps/api/` (or copy from `.env.example`):
```bash
NODE_ENV=development
PORT=4000
CORS_ORIGINS=http://localhost:3000,http://localhost:8081
LOG_LEVEL=info
```

All environment variables are validated at startup using `class-validator` and `class-transformer` (`src/config/env.validation.ts`).

---

## 4. Running the API Locally

From the monorepo root:
```bash
# Start in watch/dev mode
npm --workspace=@among/api run dev

# Or build and start production bundle
npm --workspace=@among/api run build
npm --workspace=@among/api run start:prod
```

API is served at:
```
http://localhost:4000/api/v1
```

Health endpoint:
```
GET http://localhost:4000/api/v1/health
```
Response:
```json
{
  "status": "ok"
}
```

---

## 5. Running Tests

```bash
# Unit tests
npm --workspace=@among/api run test

# End-to-end tests
npm --workspace=@among/api run test:e2e
```

---

## 6. Typecheck & Lint

```bash
# TypeScript Typecheck
npm --workspace=@among/api run typecheck

# Linting
npm --workspace=@among/api run lint
```

---

## 7. Architecture & Conventions

- **Global Prefix**: `/api/v1`
- **Request ID Tracking**: Every request assigns/preserves `X-Request-ID` via middleware and includes it in all error envelopes.
- **Global Error Handling**: Standardized AMONG JSON error envelope:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "requestId": "uuid"
  }
}
```
- **Validation**: Strict NestJS `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, and `transform: true`.
- **Security**: `helmet` headers enabled, configurable CORS origins via environment variables.
- **Logging**: Structured JSON logging without sensitive data leaks (passwords, tokens, OTPs, precise locations).
