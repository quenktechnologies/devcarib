# Build script for board

### Current location. ###
HERE=$(shell pwd)
SHELL=/bin/bash -o pipefail

### Binaries. ###
TDC?=$(HERE)/node_modules/.bin/tdc
TSC?=$(HERE)/node_modules/.bin/tsc
LESSC?=$(HERE)/node_modules/.bin/lessc
WML?=$(HERE)/node_modules/.bin/wmlc
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/checks
TRANSFORM?=./node_modules/.bin/transform

# EOL marker
define EOL


endef

### Settings ###
PROJECT_SRC_DIR:=$(HERE)/src
PROJECT_SRC_DIR_FILES:=$(shell find $(PROJECT_SRC_DIR) -type f)
PACKAGES_DIR:=$(HERE)/packages
APPS_DIR:=$(HERE)/apps
LIBS_PACKAGES_DIR:=$(PACKAGES_DIR)/libs
APPS_PACKAGES_DIR:=$(PACKAGES_DIR)/frontend
PROJECT_BUILD_DIR:=$(HERE)/build

CLEAN_TARGETS:=
SRC_DIRS:=

include $(PACKAGES_DIR)/*/variables.mk
include $(APPS_DIR)/*/variables.mk

### Dependency Graph ###

.DELETE_ON_ERROR:

$(PROJECT_BUILD_DIR): $(PROJECT_SRC_DIR_FILES)\
                      $(shell find $(PACKAGES_DIR) -mindepth 1\
                      -maxdepth 1 -type d)\
                      $(shell find $(APPS_DIR) -mindepth 1 \
                       -maxdepth 1 -type d)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(PROJECT_SRC_DIR)/* $@
	$(TDC) $(PROJECT_BUILD_DIR)
	$(TSC) -p $@
	touch $(PROJECT_BUILD_DIR)

# Include *.mk files here.
include $(PACKAGES_DIR)/*/build.mk
include $(APPS_DIR)/*/build.mk

# Remove the build application files.
.PHONY: clean
clean: 
	rm -R $(PROJECT_BUILD_DIR) || true
	rm -R $(CLEAN_TARGETS) || true

# Starts a development server for testing while working.
.PHONY: devserver
devserver:
	./node_modules/.bin/node-supervisor -w build/ -- \
	-r dotenv/config build/start.js

# If mongod is installed, starts an instance using the folder .mongo
.PHONY: mongoserver
mongoserver: 
	mongod --dbpath=.mongo
