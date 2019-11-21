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
PROJECT_PACKAGES_DIR:=$(HERE)/packages
PROJECT_BUILD_DIR:=$(HERE)/dest
PROJECT_BUILD_MAIN_DIR:=$(PROJECT_BUILD_DIR)/main

# Configure the paths for your extra packages here.
CSA_SESSION_BUILD:=$(PROJECT_PACKAGES_DIR)/csa-session/lib

### Dependency Graph ###

# The whole application gets built to here.
# Remember to add a dependency here for each of your extra packages.
$(PROJECT_BUILD_DIR): $(PROJECT_SRC_DIR_FILES)\
		      $(CSA_SESSION_BUILD)\
		      public/board.css
	mkdir -p $@
	cp -R -u $(PROJECT_SRC_DIR)/* $@
	$(TDC) $(PROJECT_BUILD_MAIN_DIR)
	$(TSC) -p $@
	$(TOUCH) $(PROJECT_BUILD_DIR)

# Include *.mk files here.
include $(PROJECT_PACKAGES_DIR)/csa-session/build.mk

public/board.css: $(shell find src/main/less -name \*.less)
	./node_modules/.bin/lessc src/main/less/main.less > $@ 

# Remove the build application files.
.PHONY: clean
clean: 
	rm -R $(PROJECT_BUILD_DIR) || true
