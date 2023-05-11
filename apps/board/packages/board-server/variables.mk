BOARD_SERVER_DIR:=$(BOARD_PACKAGES_DIR)/board-server
CLEAN_TARGETS:=$(CLEAN_TARGETS) $(BOARD_SERVER_DIR)/lib

include $(shell find $(BOARD_SERVER_DIR)/src -name variables.mk)
