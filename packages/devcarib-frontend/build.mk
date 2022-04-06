$(DEVCARIB_FRONTEND_DIR): $(DEVCARIB_FRONTEND_LIB_DIR)
	touch $@

$(DEVCARIB_FRONTEND_LIB_DIR): $(DEVCARIB_FRONTEND_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(DEVCARIB_FRONTEND_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@
