$(CONVERSE_DIR): $(CONVERSE_BUILD_DIR)
	touch $@

$(CONVERSE_BUILD_DIR): $(CONVERSE_SRC_DIR) $(CONVERSE_PACKAGES_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(CONVERSE_SRC_DIR)/* $@
	$(TDC) $(CONVERSE_BUILD_DIR)
	$(TSC) -p $@
	touch $(CONVERSE_BUILD_DIR)

$(CONVERSE_SRC_DIR): $(CONVERSE_SRC_DIR_FILES)
	touch $@

include $(CONVERSE_SCHEMA_DIR)/build.mk
include $(CONVERSE_PACKAGES_DIR)/build.mk
