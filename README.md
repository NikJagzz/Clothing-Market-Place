# Shopify Marketplace

## Overview

This project contains a **React (TypeScript + Tailwind CSS) frontend** and a **Node.js backend** connected to a **PostgreSQL database** using Docker Compose for easy local development and deployment.

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- Node.js and npm installed (for local development outside Docker)

---

## Getting Started with Docker Compose

### 1. Clone the repository

```bash
git clone <repo-url>
cd Shopify-marketplace
```

### 2. Clone the repository

```bash
docker compose up --build -d
```

### 3. Verify services

Client: http://localhost:3000

Server API: http://localhost:3001/api/products

PostgreSQL: Running internally, mapped on port 5432

### 4. Rebuilding

```bash
docker compose build client
docker compose up -d client
```

OR for all

```bash
docker compose up --build -d
```

### 5. Start all services (without rebuilding):

```bash
docker compose up -d
```
