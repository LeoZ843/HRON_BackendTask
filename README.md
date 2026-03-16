# HR-ON Backend Task

A small backend service built with Node.js, TypeScript, Express, and PostgreSQL (via Prisma).

## Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express 5
- **Database**: PostgreSQL 18
- **ORM**: Prisma 7
- **Testing**: Jest + Supertest
- **Rate limiting**: express-rate-limit

## Prerequisites

- Node.js 20+
- PostgreSQL 18
- npm 10+

## Setup

### 1. Clone the repository

```bash
git clone https://https://github.com/LeoZ843/HRON_BackendTask.git
cd HRON_BackendTask
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a PostgreSQL database and user

```sql
CREATE DATABASE hron_backend;
CREATE USER hron_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE hron_backend TO hron_user;
GRANT ALL ON SCHEMA public TO hron_user;
ALTER USER hron_user CREATEDB;
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://hron_user:yourpassword@localhost:5432/hron_backend"
PORT=3000
```

### 5. Run database migrations

```bash
npx prisma migrate deploy
```

### 6. Generate Prisma client

```bash
npx prisma generate
```

## Running the server

**Development** (ts-node, no compilation step):
```bash
npm run dev
```

**Production** (compile first, then run):
```bash
npm run build
npm start
```

The server listens on the port defined in `.env` (default: `3000`).

## API

### `GET /api/health`

Returns the health status of the service.

**Rate limit**: 1 request per 10 seconds per IP address.

#### Query parameters

| Parameter | Description |
|-----------|-------------|
| *(none)*  | Returns full health status |
| `query=database` | Returns only the database connection status |
| `query=data` | Returns only whether the `task` table has data |

#### Responses

**200 — no query parameter**
```json
{
  "db_connected": true,
  "has_data": true
}
```

**200 — `?query=database`**
```json
{
  "db_connected": true
}
```

**200 — `?query=data`**
```json
{
  "has_data": true
}
```

**400 — invalid query parameter**
```json
{
  "error": "Invalid query parameter. Allowed values: database, data."
}
```

**429 — rate limit exceeded**
```json
{
  "error": "Too many requests, please try again later."
}
```

## Running tests

```bash
npm test
```

Tests use mocked service calls and do not require a running database or server. The rate limiter is bypassed in the test environment.

## Security notes

All `npm audit` warnings are confined to the `prisma` CLI devDependencies (specifically Prisma Studio's internal HTTP server). They are not present in the production runtime (`@prisma/client`) and pose no risk to the application.
