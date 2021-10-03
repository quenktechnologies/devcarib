### Builds converse-views ###
$(CONVERSE_VIEWS_DIR): $(CONVERSE_VIEWS_LIB_DIR)\
                       $(CONVERSE_VIEWS_PUBLIC_DIR)
	touch $@

$(CONVERSE_VIEWS_LIB_DIR): $(CONVERSE_VIEWS_SRC_DIR)
	rm -R $@ || true
	cp -R -u $(CONVERSE_VIEWS_SRC_DIR) $@
	$(WML) $@
	$(TSC) --project $@
	touch $@

$(CONVERSE_VIEWS_SRC_DIR): $(CONVERSE_VIEWS_SRC_DIR_FILES)
	touch $@

$(CONVERSE_VIEWS_PUBLIC_DIR): $(CONVERSE_VIEWS_CSS_FILE)
	touch $@

$(CONVERSE_VIEWS_CSS_FILE): $(CONVERSE_VIEWS_LESS_IMPORTS) \
			    $(CONVERSE_VIEWS_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(CONVERSE_VIEWS_JS_VARS) $(CONVERSE_VIEWS_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(CONVERSE_VIEWS_LESS_IMPORTS): $(CONVERSE_VIEWS_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(CONVERSE_VIEWS_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
