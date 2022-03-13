$(MIA_DIR): $(MIA_BUILD_DIR) $(MIA_FRONTEND_DIR)
	touch $@

$(MIA_BUILD_DIR): $(MIA_SRC_DIR)\
		  $(shell find $(MIA_PACKAGES_DIR) -mindepth 1 \
	             -maxdepth 1 -type d)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(MIA_SRC_DIR)/* $@
	$(TDC) $(MIA_BUILD_DIR)
	$(TSC) -p $@
	touch $(MIA_BUILD_DIR)

$(MIA_SRC_DIR): $(MIA_SRC_DIR_FILES)
	touch $@
	
include $(MIA_SCHEMA_DIR)/build.mk
include $(MIA_PACKAGES_DIR)/*/build.mk
include $(MIA_FRONTEND_DIR)/build.mk
