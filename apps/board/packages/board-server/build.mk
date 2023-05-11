$(BOARD_SERVER_DIR): $(BOARD_SERVER_DIR)/lib
	touch $@

$(BOARD_SERVER_DIR)/lib: $(shell find $(BOARD_SERVER_DIR)/src -type f) \
			 $(subst /build.mk,,$(shell find $(BOARD_SERVER_DIR)/src -name build.mk))
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_SERVER_DIR)/src/* $@
	$(TSC) --project $@
	touch $@

include $(shell find $(BOARD_SERVER_DIR)/src -name build.mk)
