BOARD_DIR:=$(DC_APPS_DIR)/board
BOARD_SCHEMA_DIR:=$(BOARD_DIR)/schema
BOARD_PACKAGES_DIR:=$(BOARD_DIR)/packages
BOARD_BUILD_DIR:=$(BOARD_DIR)/build
BOARD_FRONTEND_DIR:=$(BOARD_DIR)/frontend
BOARD_PUBLIC_DIR:=$(BOARD_DIR)/public

CLEAN_TARGETS:=$(CLEAN_TARGETS) \
	        $(BOARD_BUILD_DIR) \
	        $(BOARD_PUBLIC_DIR)/assets/css/board.css

include $(BOARD_SCHEMA_DIR)/variables.mk
include $(BOARD_PACKAGES_DIR)/*/variables.mk
include $(BOARD_FRONTEND_DIR)/variables.mk
