$(MIA_SERVER_DIR): $(MIA_SERVER_DIR)/lib
	touch $@

$(MIA_SERVER_DIR)/lib: $(shell find $(MIA_SERVER_DIR)/src -type f) \
	        $(subst /build.mk,,$(shell find $(MIA_SERVER_DIR)/src -name build.mk))
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(MIA_SERVER_DIR)/src/* $@
	$(TSC) --project $@
	touch $@

include $(shell find $(MIA_SERVER_DIR)/src -name build.mk)
