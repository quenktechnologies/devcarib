$(APPS_DIR): $(CONVERSE_DIR) $(MIA_DIR)
	touch $@

include $(CONVERSE_DIR)/build.mk
include $(MIA_DIR)/build.mk

