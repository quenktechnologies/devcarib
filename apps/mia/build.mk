$(MIA_DIR): $(MIA_BUILD_DIR)
	touch $@

$(MIA_BUILD_DIR): $(MIA_SRC_DIR) $(MIA_PACKAGES_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(MIA_SRC_DIR)/* $@
	$(TDC) $(MIA_BUILD_MAIN_DIR)
	$(TSC) -p $@
	touch $(MIA_BUILD_DIR)

$(MIA_SRC_DIR): $(MIA_SRC_DIR_FILES)
	touch $@

include $(MIA_SCHEMA_DIR)/build.mk
include $(MIA_PACKAGES_DIR)/build.mk
