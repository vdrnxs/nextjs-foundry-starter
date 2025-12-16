# ============================================
# Development Dockerfile (optimized for cache)
# ============================================
FROM node:20-alpine

# Enable pnpm via corepack (official method)
RUN corepack enable

WORKDIR /app

# 1. Copy dependency files ONLY (these rarely change)
# This layer will be cached unless package.json changes
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/

# 2. Install dependencies with cache optimization
# --frozen-lockfile: Don't modify lockfile (like npm ci)
# --shamefully-hoist: Fix symlink issues in Docker
RUN pnpm install --frozen-lockfile --shamefully-hoist

# 3. Copy source code (changes frequently, but install is cached)
COPY . .

EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]
