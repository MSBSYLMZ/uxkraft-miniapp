FROM node:alpine AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies for API
WORKDIR /app/apps/api
RUN npm install

# Install dependencies for Web
WORKDIR /app/apps/web
RUN npm install

# Build web first
RUN npm run build

# Build API
WORKDIR /app/apps/api
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/web/dist ./apps/web/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/package*.json ./apps/api/

COPY --from=builder /app/apps/api/seeders ./apps/api/seeders
COPY --from=builder /app/apps/api/migrations ./apps/api/migrations
COPY --from=builder /app/apps/api/config ./apps/api/config

WORKDIR /app/apps/api

EXPOSE 3000

RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Running migrations..."' >> /start.sh && \
    echo 'npx sequelize-cli db:migrate' >> /start.sh && \
    echo 'echo "Running seeds..."' >> /start.sh && \
    echo 'npx sequelize-cli db:seed:all' >> /start.sh && \
    echo 'echo "Starting application..."' >> /start.sh && \
    echo 'node dist/main.js' >> /start.sh && \
    chmod +x /start.sh

CMD ["/start.sh"]