$(BOARD_VIEWS_DIR): $(BOARD_VIEWS_LIB_DIR)\
                    $(BOARD_VIEWS_PUBLIC_DIR)\
                    $(DEVCARIB_WIDGETS_DIR)
	touch $@

$(BOARD_VIEWS_LIB_DIR): $(BOARD_VIEWS_SRC_DIR)
	rm -R $@ || true
	cp -R -u $(BOARD_VIEWS_SRC_DIR) $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_VIEWS_SRC_DIR): $(BOARD_VIEWS_SRC_DIR_FILES)
	touch $@

$(BOARD_VIEWS_PUBLIC_DIR): $(BOARD_VIEWS_CSS_FILE)
	touch $@

$(BOARD_VIEWS_CSS_FILE): $(DEVCARIB_WIDGETS_DIR) \
			 $(BOARD_VIEWS_LESS_IMPORTS) \
			 $(BOARD_VIEWS_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_VIEWS_JS_VARS) $(BOARD_VIEWS_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_VIEWS_LESS_IMPORTS): $(BOARD_VIEWS_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_VIEWS_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
