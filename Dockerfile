FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build --no-lint

# Expose port
EXPOSE 3004
ENV PORT=3004

# Start the application
CMD ["bun", "server.js"] 