include .env
export

run-server:
	go run server/cmd/main.go

test-server:
	go test -v server/.../.

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