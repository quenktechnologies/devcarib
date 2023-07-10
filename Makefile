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
include tasks.mk
