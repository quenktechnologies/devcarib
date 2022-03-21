$(DEVCARIB_COMMON_DIR): $(DEVCARIB_COMMON_LIB_DIR)
	touch $@

$(DEVCARIB_COMMON_LIB_DIR): $(DEVCARIB_COMMON_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(DEVCARIB_COMMON_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@
