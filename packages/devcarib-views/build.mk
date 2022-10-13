$(DEVCARIB_VIEWS_DIR): $(DEVCARIB_VIEWS_LIB_DIR)\
                       $(DEVCARIB_VIEWS_PUBLIC_DIR)
	touch $@

$(DEVCARIB_VIEWS_LIB_DIR): $(DEVCARIB_VIEWS_SRC_DIR)
	rm -R $@ || true
	cp -R -u $(DEVCARIB_VIEWS_SRC_DIR) $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(DEVCARIB_VIEWS_SRC_DIR): $(DEVCARIB_VIEWS_SRC_DIR_FILES)
	touch $@

$(DEVCARIB_VIEWS_PUBLIC_DIR): $(DEVCARIB_VIEWS_MIA_CSS_FILE)\
			      $(DEVCARIB_VIEWS_CONVERSE_CSS_FILE)
	touch $@

$(DEVCARIB_VIEWS_MIA_CSS_FILE): $(DEVCARIB_WIDGETS_DIR) \
		                $(DEVCARIB_VIEWS_MIA_LESS_IMPORTS) \
		                $(DEVCARIB_VIEWS_MIA_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(DEVCARIB_VIEWS_JS_VARS) $(DEVCARIB_VIEWS_MIA_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(DEVCARIB_VIEWS_MIA_LESS_IMPORTS): $(DEVCARIB_VIEWS_MIA_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(DEVCARIB_VIEWS_SRC_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true

$(DEVCARIB_VIEWS_CONVERSE_CSS_FILE): $(DEVCARIB_WIDGETS_DIR) \
		                     $(DEVCARIB_VIEWS_CONVERSE_LESS_IMPORTS) \
		                     $(DEVCARIB_VIEWS_CONVERSE_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(DEVCARIB_VIEWS_JS_VARS) $(DEVCARIB_VIEWS_CONVERSE_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(DEVCARIB_VIEWS_CONVERSE_LESS_IMPORTS): $(DEVCARIB_VIEWS_CONVERSE_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(DEVCARIB_VIEWS_SRC_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
