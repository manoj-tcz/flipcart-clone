# Flipkart Clone Frontend

Next.js frontend for the Flipkart clone project.  
Backend is Laravel and both services run together with Docker Compose from the project root.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose available (`docker compose version`)

## Run with Docker (recommended)

Run these commands from the project root:

```bash
cd ..
docker compose up --build -d
```

After startup:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api](http://localhost:8000/api)

## Useful Docker commands

### Check running containers

```bash
docker compose ps
```

### View logs

```bash
docker compose logs -f
```

### Restart services

```bash
docker compose restart
```

### Rebuild after code changes

```bash
docker compose up --build -d
```

### Stop and remove containers

```bash
docker compose down
```

### Remove containers, network, and volumes (full reset)

```bash
docker compose down -v
```

## Environment notes

- Frontend uses:
  - `NEXT_PUBLIC_API_URL=http://localhost:8000`
  - `INTERNAL_API_URL=http://backend:8000`
- These are already wired in `docker-compose.yml`.

## Local run without Docker (optional)

From `frontend`:

```bash
npm install
npm run dev
```

Frontend local URL: [http://localhost:3000](http://localhost:3000)
