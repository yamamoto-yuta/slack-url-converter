.PHONY: i
i:
	docker-compose run --rm app sh -c "cd slack-url-converter/ && npm i"

.PHONY: dev
dev:
	docker-compose run --rm app sh -c "cd slack-url-converter/ && npm run dev"

.PHONY: build
build:
	docker-compose run --rm app sh -c "cd slack-url-converter/ && npm run build"

.PHONY: all
all:
	docker-compose run --rm app sh -c "cd slack-url-converter/ && npm i && npm run dev && npm run build"