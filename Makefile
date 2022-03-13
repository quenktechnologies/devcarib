# Build script for board

### Current location. ###
HERE=$(shell pwd)
SHELL=/bin/bash -o pipefail

### Binaries. ###
TDC?=$(HERE)/node_modules/.bin/tdc
TSC?=$(HERE)/node_modules/.bin/tsc
LESSC?=$(HERE)/node_modules/.bin/lessc
WML?=$(HERE)/node_modules/.bin/wmlc
MKDIRP?=mkdir -p
FIND?=find
CP?=cp
CPR?=$(CP) -R
RMR?=-rm -R
TOUCH?=touch

### Helper macros. ###

# EOL marker
define EOL


endef

### Settings ###
PROJECT_SRC_DIR:=$(HERE)/src
PROJECT_SRC_DIR_FILES:=$(shell $(FIND) $(PROJECT_SRC_DIR) -type f)
PACKAGES_DIR:=$(HERE)/packages
APPS_DIR:=$(HERE)/apps
LIBS_PACKAGES_DIR:=$(PACKAGES_DIR)/libs
APPS_PACKAGES_DIR:=$(PACKAGES_DIR)/frontend
PROJECT_BUILD_DIR:=$(HERE)/build

# To be moved elsewhere when the project is renamed.
BOARD_DIR:=$(HERE)
BOARD_FRONTENDS_DIR:=$(BOARD_DIR)/frontends
BOARD_PACKAGES_DIR:=$(BOARD_DIR)/packages

CLEAN_TARGETS:=
SRC_DIRS:=

# Configure the paths for your extra packages here.
include $(HERE)/schema/variables.mk
include $(PACKAGES_DIR)/variables.mk
include $(BOARD_FRONTENDS_DIR)/variables.mk
include $(APPS_DIR)/*/variables.mk

### Dependency Graph ###

.DELETE_ON_ERROR:

# The whole application gets built to here.
# Remember to add a dependency here for each of your extra packages.
$(PROJECT_BUILD_DIR): $(PROJECT_SRC_DIR_FILES)\
                      $(BOARD_SCHEMA_DIR) \
                      $(shell find $(BOARD_PACKAGES_DIR) -mindepth 1\
                      -maxdepth 1 -type d)\
                      $(BOARD_FRONTENDS_DIR)\
                      $(BOARD_VIEWS_DIR)\
                      $(shell find $(APPS_DIR) -mindepth 1 \
                       -maxdepth 1 -type d)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(PROJECT_SRC_DIR)/* $@
	$(TDC) $(PROJECT_BUILD_DIR)
	$(TSC) -p $@
	$(TOUCH) $(PROJECT_BUILD_DIR)

# Include *.mk files here.
include $(BOARD_SCHEMA_DIR)/build.mk
include $(BOARD_PACKAGES_DIR)/*/build.mk
include $(BOARD_FRONTENDS_DIR)/build.mk
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
