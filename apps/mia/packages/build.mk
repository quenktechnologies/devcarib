$(MIA_PACKAGES_DIR): $(MIA_LIBS_DIR)
	touch $@

include $(MIA_LIBS_DIR)/build.mk
