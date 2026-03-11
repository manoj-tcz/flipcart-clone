# Flipkart Clone (Laravel + Next.js)

This project is a Flipkart-style clone with:

- `backend`: Laravel API (catalog categories/products)
- `frontend`: Next.js App Router storefront UI
- `docker-compose.yml`: runs both apps together

## Local run (without Docker)

### 1) Backend

```bash
cd backend
php artisan migrate:fresh --seed
php artisan serve
```

Backend API runs on `http://localhost:8000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Run with Docker

From project root:

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/api`

## API endpoints

- `GET /api/health`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/{slug}`
- `GET /api/dashboard`
- `POST /api/contact`
- `GET /api/cart/{guestToken}`
- `POST /api/cart/{guestToken}/items`
- `PATCH /api/cart/{guestToken}/items/{itemId}`
- `DELETE /api/cart/{guestToken}/items/{itemId}`
- `POST /api/cart/{guestToken}/checkout` (dummy payment)

## Frontend routes

- `/` storefront with category filter + cart service
- `/cart` cart management + dummy payment checkout
- `/dashboard` admin-style summary widgets
- `/contact` contact form posting to backend
