# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install all dependencies (including dev) for the build
COPY package*.json ./
RUN npm ci

# Build the app
COPY . .
RUN npm run build

# Production stage — Next.js standalone server on port 80
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0
# Set at runtime: WEB3FORMS_ACCESS_KEY (contact form)

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    apk add --no-cache wget

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["node", "server.js"]