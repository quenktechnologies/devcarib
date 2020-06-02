# Build script for {{{project.name}}}.
# 
# This script is intended to build an acyclical dependency graph
# of your projects build into $PROJECT_DEST_DIR.
#
# Try to separate complex sub-builds into the packages folder where possible.

### Current location. ###
HERE=$(shell pwd)
SHELL=/bin/bash -o pipefail

### Binaries. ###
TDC?=$(HERE)/node_modules/.bin/tdc
TSC?=$(HERE)/node_modules/.bin/tsc
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
LOCAL_PACKAGES_DIR:=$(PACKAGES_DIR)/local
PROJECT_BUILD_DIR:=$(HERE)/build
PROJECT_BUILD_MAIN_DIR:=$(PROJECT_BUILD_DIR)/main

# Configure the paths for your extra packages here.
CSA_SESSION_BUILD:=$(PACKAGES_DIR)/csa-session/lib
BOARD_TYPES_BUILD:=$(PACKAGES_DIR)/board-types/lib
BOARD_VALIDATION_BUILD:=$(PACKAGES_DIR)/board-validation/lib
BOARD_CHECKS_BUILD:=$(PACKAGES_DIR)/board-checks/lib
BOARD_FRONTEND_BUILD:=$(PACKAGES_DIR)/board-frontend/public
BOARD_VIEWS_DIR:=$(LOCAL_PACKAGES_DIR)/board-views
BOARD_APP_POST_DIR:=$(LOCAL_PACKAGES_DIR)/board-app-post
### Dependency Graph ###

.DELETE_ON_ERROR:

# The whole application gets built to here.
# Remember to add a dependency here for each of your extra packages.
$(PROJECT_BUILD_DIR): $(PROJECT_SRC_DIR_FILES)\
		      $(BOARD_TYPES_BUILD)\
		      $(BOARD_VALIDATION_BUILD)\
		      $(BOARD_CHECKS_BUILD)\
		      $(BOARD_FRONTEND_BUILD)\
		      $(BOARD_VIEWS_DIR)\
		      $(BOARD_APP_POST_DIR)
	mkdir -p $@
	cp -R -u $(PROJECT_SRC_DIR)/* $@
	$(TDC) $(PROJECT_BUILD_MAIN_DIR)
	$(TSC) -p $@
	$(TOUCH) $(PROJECT_BUILD_DIR)

# Include *.mk files here.
include $(PACKAGES_DIR)/board-frontend/build.mk
include $(PACKAGES_DIR)/board-types/build.mk
include $(PACKAGES_DIR)/board-validation/build.mk
include $(PACKAGES_DIR)/board-checks/build.mk
include $(BOARD_VIEWS_DIR)/build.mk
include $(BOARD_APP_POST_DIR)/build.mk

# Remove the build application files.
.PHONY: clean
clean: 
	rm -R $(PROJECT_BUILD_DIR) || true
