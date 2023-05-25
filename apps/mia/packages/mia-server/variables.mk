MIA_SERVER_DIR:=$(MIA_PACKAGES_DIR)/mia-server
CLEAN_TARGETS:=$(CLEAN_TARGETS) $(MIA_SERVER_DIR)/lib

include $(shell find $(MIA_SERVER_DIR)/src -name variables.mk)
