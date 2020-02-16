infra:
	$(call log, "Starting docker containers")
	docker-compose up

node_modules:
	$(call log, "Installing dependencies")
	rm -rf node_modules
	yarn cache clean --force
	yarn install

watch:
	$(call log, "Starting dev server")
	yarn start:dev

test:
	$(call log, "Running tests")
	yarn test

rules := \
	infra \
	node_modules \
	watch \
	test \

.PHONY: $(rules)
