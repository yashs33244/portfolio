FROM oven/bun:1

WORKDIR /app

# Copy package files first to leverage caching
COPY package.json bun.lockb* ./

# Install all dependencies (including dev dependencies)
RUN bun install --frozen-lockfile

# Copy only necessary files for build
COPY next.config.js ./
COPY tsconfig.json ./
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY public ./public
COPY styles ./styles
COPY prisma ./prisma
COPY hooks ./hooks

# Build the application with optimizations
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN bun run build --no-lint

# Clean up development dependencies
RUN bun install --frozen-lockfile --production

# Expose port
EXPOSE 3004
ENV PORT=3004

# Start the application
CMD ["bun", "server.js"] 