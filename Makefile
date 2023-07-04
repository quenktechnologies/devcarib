include common.mk

### Settings ###
DC_DIR:=$(HERE)
DC_PACKAGES_DIR:=$(DC_DIR)/packages
DC_APPS_DIR:=$(DC_DIR)/apps

CLEAN_TARGETS:=
SRC_DIRS:=

# Legacy
PACKAGES_DIR:=$(DC_PACKAGES_DIR)
APPS_DIR:=$(DC_APPS_DIR)

include $(DC_PACKAGES_DIR)/*/variables.mk
include $(DC_APPS_DIR)/*/variables.mk

# Parse the .env file if it exists.
ifneq ("$(wildcard .env)","")
	    include .env
endif

### Dependency Graph ###

.DELETE_ON_ERROR:

$(DC_DIR): $(shell find $(DC_PACKAGES_DIR) -mindepth 1 -maxdepth 1 -type d) \
           $(shell find $(DC_APPS_DIR) -mindepth 1 -maxdepth 1 -type d)
	touch $@

include $(DC_PACKAGES_DIR)/*/build.mk
include $(DC_APPS_DIR)/*/build.mk

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

