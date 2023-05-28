$(CONVERSE_SERVER_DIR): $(CONVERSE_SERVER_DIR)/lib
	touch $@

$(CONVERSE_SERVER_DIR)/lib: $(shell find $(CONVERSE_SERVER_DIR)/src -type f) \
	        $(subst /build.mk,,$(shell find $(CONVERSE_SERVER_DIR)/src -name build.mk))
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(CONVERSE_SERVER_DIR)/src/* $@
	$(TSC) --project $@
	touch $@

include $(shell find $(CONVERSE_SERVER_DIR)/src -name build.mk)
