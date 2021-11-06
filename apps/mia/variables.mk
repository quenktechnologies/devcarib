MIA_DIR:=$(APPS_DIR)/mia
MIA_SRC_DIR:=$(MIA_DIR)/src
MIA_SRC_DIR_FILES:=$(shell find $(MIA_SRC_DIR) -type f)
MIA_BUILD_DIR:=$(MIA_DIR)/build
MIA_PACKAGES_DIR:=$(MIA_DIR)/packages

CLEAN_TARGETS:=$(CLEAN_TARGETS) $(MIA_BUILD_DIR)

include $(MIA_DIR)/schema/variables.mk
include $(MIA_PACKAGES_DIR)/variables.mk
include $(MIA_DIR)/frontend/variables.mk
