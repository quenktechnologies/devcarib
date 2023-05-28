CONVERSE_SERVER_DIR:=$(CONVERSE_PACKAGES_DIR)/converse-server
CLEAN_TARGETS:=$(CLEAN_TARGETS) $(CONVERSE_SERVER_DIR)/lib

include $(shell find $(CONVERSE_SERVER_DIR)/src -name variables.mk)
