.PHONY: help build up down logs clean restart test dev prod-build prod-up

help:
	@echo "🐳 Avito Test Project - Docker Commands"
	@echo ""
	@echo "Production:"
	@echo "  make build        - Собрать все Docker образы"
	@echo "  make up           - Запустить все сервисы (production)"
	@echo "  make down         - Остановить все сервисы"
	@echo "  make restart      - Перезапустить все сервисы"
	@echo "  make logs         - Показать логи всех сервисов"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Запустить в development режиме"
	@echo "  make dev-down     - Остановить development сервисы"
	@echo "  make dev-logs     - Показать логи development"
	@echo ""
	@echo "Testing:"
	@echo "  make test         - Запустить тесты"
	@echo "  make test-coverage - Запустить тесты с coverage"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean        - Удалить контейнеры и volumes"
	@echo "  make clean-all    - Удалить всё (включая образы)"
	@echo "  make ps           - Показать статус контейнеров"
	@echo "  make stats        - Показать использование ресурсов"

build:
	docker-compose build

up:
	docker-compose up -d
	@echo "✅ Сервисы запущены!"
	@echo "Frontend: http://localhost"
	@echo "Backend:  http://localhost:3001"

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

dev:
	docker-compose -f docker-compose.dev.yml up
	@echo "✅ Development сервисы запущены!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend:  http://localhost:3001"

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

test:
	docker-compose exec frontend npm test

test-coverage:
	docker-compose exec frontend npm run test:coverage

ps:
	docker-compose ps

stats:
	docker stats

clean:
	docker-compose down -v
	@echo "✅ Контейнеры и volumes удалены"

clean-all:
	docker-compose down -v --rmi all
	docker system prune -f
	@echo "✅ Всё очищено!"

prod-build: build

prod-up: build up

backend-logs:
	docker-compose logs -f backend

frontend-logs:
	docker-compose logs -f frontend

backend-shell:
	docker-compose exec backend sh

frontend-shell:
	docker-compose exec frontend sh

