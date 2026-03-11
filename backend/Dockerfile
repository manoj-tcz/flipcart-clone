FROM php:8.3-cli

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y git unzip libsqlite3-dev && docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader
RUN php -r "file_exists('.env') || copy('.env.example', '.env');"
RUN php artisan key:generate --ansi
RUN php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"

EXPOSE 8000

CMD php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=8000
