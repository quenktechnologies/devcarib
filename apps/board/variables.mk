BOARD_DIR:=$(APPS_DIR)/board
BOARD_SRC_DIR:=$(BOARD_DIR)/src
BOARD_SRC_DIR_FILES:=$(shell find $(BOARD_SRC_DIR) -type f)
BOARD_BUILD_DIR:=$(BOARD_DIR)/build
BOARD_PACKAGES_DIR:=$(BOARD_DIR)/packages
BOARD_FRONTEND_DIR:=$(BOARD_DIR)/frontend

CLEAN_TARGETS:=$(CLEAN_TARGETS) $(BOARD_BUILD_DIR)

include $(BOARD_DIR)/schema/variables.mk
include $(BOARD_PACKAGES_DIR)/*/variables.mk
include $(BOARD_DIR)/frontend/*/variables.mk
