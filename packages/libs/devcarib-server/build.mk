### Builds devcarib-server. #

$(DEVCARIB_SERVER_DIR): $(DEVCARIB_SERVER_LIB_DIR)
	touch $@

$(DEVCARIB_SERVER_LIB_DIR): $(DEVCARIB_SERVER_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(DEVCARIB_SERVER_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@
