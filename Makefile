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

### Settings. ###
PROJECT_SRC_DIR:=$(HERE)/src
PROJECT_SRC_DIR_FILES:=$(shell $(FIND) $(PROJECT_SRC_DIR) -type f)
PACKAGES_DIR:=$(HERE)/packages
LIBS_PACKAGES_DIR:=$(PACKAGES_DIR)/libs
APPS_PACKAGES_DIR:=$(PACKAGES_DIR)/frontend
EXTRAS_PACKAGES_DIR:=$(PACKAGES_DIR)/extras
PROJECT_BUILD_DIR:=$(HERE)/build
PROJECT_BUILD_MAIN_DIR:=$(PROJECT_BUILD_DIR)/app

BOARD_CLEAN_TARGETS:=
BOARD_SRC_DIRS:=

# Configure the paths for your extra packages here.
BOARD_SCHEMA_DIR:=$(EXTRAS_PACKAGES_DIR)/board-schema
BOARD_TYPES_DIR:=$(LIBS_PACKAGES_DIR)/board-types
BOARD_VALIDATORS_DIR:=$(LIBS_PACKAGES_DIR)/board-validators
BOARD_CHECKS_DIR:=$(LIBS_PACKAGES_DIR)/board-checks
BOARD_WIDGETS_DIR:=$(LIBS_PACKAGES_DIR)/board-widgets
BOARD_FORM_POST_DIR:=$(APPS_PACKAGES_DIR)/board-form-post
BOARD_ADMIN_DIR:=$(APPS_PACKAGES_DIR)/board-admin
BOARD_VIEWS_DIR:=$(EXTRAS_PACKAGES_DIR)/board-views

### Dependency Graph ###

.DELETE_ON_ERROR:

# The whole application gets built to here.
# Remember to add a dependency here for each of your extra packages.
$(PROJECT_BUILD_DIR): $(PROJECT_SRC_DIR_FILES)\
		      $(BOARD_SCHEMA_DIR) \
		      $(BOARD_TYPES_DIR)\
		      $(BOARD_VALIDATORS_DIR)\
		      $(BOARD_CHECKS_DIR)\
		      $(BOARD_VIEWS_DIR)\
		      $(BOARD_FORM_POST_DIR)\
		      $(BOARD_ADMIN_DIR)

	mkdir -p $@
	cp -R -u $(PROJECT_SRC_DIR)/* $@
	$(TDC) $(PROJECT_BUILD_MAIN_DIR)
	$(TSC) -p $@
	$(TOUCH) $(PROJECT_BUILD_DIR)

# Include *.mk files here.
include $(BOARD_SCHEMA_DIR)/build.mk
include $(BOARD_TYPES_DIR)/build.mk
include $(BOARD_VALIDATORS_DIR)/build.mk
include $(BOARD_CHECKS_DIR)/build.mk
include $(BOARD_WIDGETS_DIR)/build.mk
include $(BOARD_VIEWS_DIR)/build.mk
include $(BOARD_FORM_POST_DIR)/build.mk
include $(BOARD_ADMIN_DIR)/build.mk

# Remove the build application files.
.PHONY: clean
clean: 
	rm -R $(PROJECT_BUILD_DIR) || true
	rm -R $(BOARD_CLEAN_TARGETS) || true

# Use to clear the node_modules cache and update to the latest version of the
# project.
.PHONY: bussdate
bussdate:
	rm -R node_modules || true
	git pull && npm install

# Shortcut for running a frontend test via crapaud.
.PHONY: crapaud
crapaud: 
	source .env
	./node_modules/.bin/crapaud --test $(filter-out $@,$(MAKECMDGOALS))\
	 --inject-mocha\
	 http://localhost:$(PORT)

# Starts a development server for testing while working.
.PHONY: devserver
devserver:
	./node_modules/.bin/node-supervisor -w build/ -- \
	-r dotenv/config build/app/start.js

# If mongod is installed, starts an instance using the folder .mongo
.PHONY: mongoserver
mongoserver: 
	mongod --dbpath=.mongo

# This is task intercepts unknown tasks allowing us to accept arguments in
# the task above.
.PHONY: %
%:
	@:
