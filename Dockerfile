# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Rebuild the source code
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Inject environment bypass fallback strings for build-time static generation
ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_MASTER_ENCRYPTION_SECRET=0000000000000000000000000000000000000000000000000000000000000000
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
ENV NEXTAUTH_SECRET=placeholder-nextauth-secret-key-2026-build
ENV NEXTAUTH_URL=http://localhost:3000

RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Setup unprivileged environment and persistent storage directories
RUN mkdir -p storage/documents && chown -R node:node /app

# Copy built application assets and dependencies
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER node

EXPOSE 3000

CMD ["npm", "start"]
