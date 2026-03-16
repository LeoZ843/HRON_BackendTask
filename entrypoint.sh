#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy --config prisma.config.production.js

echo "Starting server..."
exec node dist/src/server.js