$(BOARD_DIR): $(BOARD_BUILD_DIR) $(BOARD_FRONTEND_DIR)
	touch $@

$(BOARD_BUILD_DIR): $(BOARD_SRC_DIR)\
		    $(shell find $(BOARD_PACKAGES_DIR) -mindepth 1 \
	             -maxdepth 1 -type d)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(BOARD_SRC_DIR)/* $@
	$(TDC) $(BOARD_BUILD_DIR)
	$(TSC) -p $@
	touch $(BOARD_BUILD_DIR)

$(BOARD_SRC_DIR): $(BOARD_SRC_DIR_FILES)
	touch $@

$(BOARD_FRONTEND_DIR): $(BOARD_FORM_POST_DIR)
	
include $(BOARD_SCHEMA_DIR)/build.mk
include $(BOARD_PACKAGES_DIR)/*/build.mk
include $(BOARD_FRONTEND_DIR)/*/build.mk
