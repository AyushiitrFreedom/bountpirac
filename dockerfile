# Base stage for both builder and runner
FROM node:19.5.0-alpine AS base
WORKDIR /app

# Set build arguments
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG DATABASE_URL

# Set environment variables
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_PORT=$POSTGRES_PORT
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DB=$POSTGRES_DB
ENV DATABASE_URL=$DATABASE_URL

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Builder stage
FROM base AS builder

# Generate any necessary code or files
RUN npm run generate

RUN npm run migrate

# Build the Next.js application
RUN npm run build

# Runner stage
FROM base AS runner

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "npm run migrate && npm start"]