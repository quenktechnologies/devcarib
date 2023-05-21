$(BOARD_FRONTEND_DIR): $(BOARD_FRONTEND_PUBLIC_DIR)
	touch $@

$(BOARD_FRONTEND_PUBLIC_DIR): $(BOARD_FRONTEND_CSS_FILE)\
                              $(BOARD_FRONTEND_JS_FILE)
	touch $@

$(BOARD_FRONTEND_JS_FILE): $(BOARD_FRONTEND_LIB_DIR)
	mkdir -p $(dir $@)
	$(BROWSERIFY) $(BOARD_FRONTEND_LIB_DIR)/main.js \
	$(if $(findstring yes,$(DEV)),,|$(UGLIFYJS)) > $@

$(BOARD_FRONTEND_LIB_DIR): $(BOARD_FRONTEND_SRC_FILES) \
	                   $(BOARD_WIDGETS_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_FRONTEND_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_FRONTEND_CSS_FILE): $(BOARD_FRONTEND_LESS_IMPORTS) \
                            $(BOARD_FRONTEND_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_FRONTEND_JS_VARS) $(BOARD_FRONTEND_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_FRONTEND_LESS_IMPORTS): $(BOARD_FRONTEND_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_FRONTEND_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
