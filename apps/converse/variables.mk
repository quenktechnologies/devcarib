CONVERSE_DIR:=$(APPS_DIR)/converse
CONVERSE_SRC_DIR:=$(CONVERSE_DIR)/src
CONVERSE_SRC_DIR_FILES:=$(shell find $(CONVERSE_SRC_DIR) -type f)
CONVERSE_BUILD_DIR:=$(CONVERSE_DIR)/build
CONVERSE_BUILD_MAIN_DIR:=$(CONVERSE_BUILD_DIR)/app
CONVERSE_PACKAGES_DIR:=$(CONVERSE_DIR)/packages

include $(CONVERSE_DIR)/schema/variables.mk
include $(CONVERSE_PACKAGES_DIR)/variables.mk

