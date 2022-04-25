$(BOARD_FORM_POST_DIR): $(BOARD_FORM_POST_PUBLIC_DIR)
	touch $@

$(BOARD_FORM_POST_PUBLIC_DIR): $(BOARD_FORM_POST_CSS_FILE)\
                               $(BOARD_FORM_POST_JS_FILE)
	touch $@

$(BOARD_FORM_POST_JS_FILE): $(BOARD_FORM_POST_LIB_DIR)
	mkdir -p $(dir $@)
	$(BROWSERIFY) $(BOARD_FORM_POST_LIB_DIR)/main.js \
	$(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS)) > $@

$(BOARD_FORM_POST_LIB_DIR): $(BOARD_FORM_POST_SRC_FILES)\
			    $(DEVCARIB_FRONTEND_DIR)\
	                    $(DEVCARIB_WIDGETS_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_FORM_POST_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_FORM_POST_CSS_FILE): $(BOARD_FORM_POST_LESS_IMPORTS) \
                             $(BOARD_FORM_POST_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_FORM_POST_JS_VARS) $(BOARD_FORM_POST_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_FORM_POST_LESS_IMPORTS): $(BOARD_FORM_POST_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_FORM_POST_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
