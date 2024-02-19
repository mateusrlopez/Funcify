include .env
export

run-server:
	cd server; go run main.go

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

prepare-client:
	cd client && npm install

run-client-dev:
	cd client && npm run start:dev

run-client-prod:
	cd client && npm run build && npm run start:prod