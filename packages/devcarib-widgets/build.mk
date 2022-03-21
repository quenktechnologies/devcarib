## Builds devcarib-widgets ###

$(DEVCARIB_WIDGETS_DIR): $(DEVCARIB_WIDGETS_LIB_DIR) \
	                 $(DEVCARIB_WIDGETS_LESS_IMPORTS_FILE)
	touch $@

$(DEVCARIB_WIDGETS_LIB_DIR): $(DEVCARIB_WIDGETS_SRC_FILES)\
	                     $(BOARD_TYPES_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(DEVCARIB_WIDGETS_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(DEVCARIB_WIDGETS_LESS_IMPORTS_FILE): $(DEVCARIB_WIDGETS_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(DEVCARIB_WIDGETS_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
