include .env
export

run:
	go run cmd/main.go

test:
	go test -v .../.

tidy:
	go mod tidy

compose-up-v1:
	docker-compose up -d

compose-up-v2:
	docker compose up -d

compose-down-v1:
	docker-compose down

compose-down-v2:
	docker compose down

docker-clean-all:
	docker system prune --volumes