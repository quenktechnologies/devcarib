
$(CONVERSE_FRONTEND_DIR): $(CONVERSE_FRONTEND_PUBLIC_DIR)
	touch $@

$(CONVERSE_FRONTEND_PUBLIC_DIR): $(CONVERSE_FRONTEND_CSS_FILE)\
                                 $(CONVERSE_FRONTEND_JS_FILE)
	touch $@

$(CONVERSE_FRONTEND_JS_FILE): $(CONVERSE_FRONTEND_LIB_DIR)\
	                      $(DEVCARIB_FRONTEND_DIR)\
	                      $(DEVCARIB_WIDGETS_DIR)
	mkdir -p $(dir $@)
	$(BROWSERIFY) $(CONVERSE_FRONTEND_LIB_DIR)/main.js \
	$(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS)) > $@

$(CONVERSE_FRONTEND_LIB_DIR): $(CONVERSE_FRONTEND_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(CONVERSE_FRONTEND_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(CONVERSE_FRONTEND_CSS_FILE): $(CONVERSE_FRONTEND_LESS_IMPORTS)\
                               $(CONVERSE_FRONTEND_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(CONVERSE_FRONTEND_JS_VARS) $(CONVERSE_FRONTEND_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(CONVERSE_FRONTEND_LESS_IMPORTS): $(CONVERSE_FRONTEND_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(CONVERSE_FRONTEND_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
