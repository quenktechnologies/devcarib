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

BOARD_PUBLIC_DIR:=$(BOARD_DIR)/public/board
BOARD_CSS_FILE:=$(BOARD_PUBLIC_DIR)/assets/css/site.css
BOARD_LESS_FILES:=$(shell find $(BOARD_SRC_DIR) -name \*.less)
BOARD_LESS_MAIN_FILE:=$(BOARD_DIR)/main.less
BOARD_LESS_IMPORTS_FILE:=$(BOARD_DIR)/imports.less
