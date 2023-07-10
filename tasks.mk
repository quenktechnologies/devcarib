# Remove build artifacts.
.PHONY: clean
clean: 
	rm -R $(CLEAN_TARGETS) || true

# Starts a development server, however you must set the APP env var.
.PHONY: devserver
devserver:
	./node_modules/.bin/node-supervisor -w build/ -- \
	-r dotenv/config apps/$(APP)/build/start.js

# If mongod is installed, starts an instance using the folder .mongo
.PHONY: mongoserver
mongoserver: 
	mongod --dbpath=.mongo
	
.PHONY: format
format:
	./node_modules/.bin/prettier --write \
	 {apps,packages}/*/src/*.{ts,less,json} \
	 {apps,packages}/*/src/**/*.{ts,less,json} \
	 apps/*/frontend/src/*.{ts,less,json} \
	 apps/*/frontend/src/**/*.{ts,less,json} \
	 apps/*/schema/*.json \
	 apps/*/schema/**/*.json

.PHONY: lint
lint:
	./node_modules/.bin/eslint \
	{apps,packages}/*/src/*.ts \
	{apps,packages}/*/src/**/*.ts \
	apps/*/frontend/src/*.ts \
	apps/*/frontend/src/**/*.ts

