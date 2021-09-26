### Builds mia-views ##

$(MIA_VIEWS_DIR): $(MIA_VIEWS_LIB_DIR)\
                  $(MIA_VIEWS_PUBLIC_DIR)
	touch $@

$(MIA_VIEWS_LIB_DIR): $(MIA_VIEWS_SRC_DIR)
	rm -R $@ || true
	cp -R -u $(MIA_VIEWS_SRC_DIR) $@
	$(WML) $@
	$(TSC) --project $@
	touch $@

$(MIA_VIEWS_SRC_DIR): $(MIA_VIEWS_SRC_DIR_FILES)
	touch $@

$(MIA_VIEWS_PUBLIC_DIR): $(MIA_VIEWS_CSS_FILE)
	touch $@

$(MIA_VIEWS_CSS_FILE): $(DEVCARIB_WIDGETS_DIR) \
		       $(MIA_VIEWS_LESS_IMPORTS) \
		       $(MIA_VIEWS_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(MIA_VIEWS_JS_VARS) $(MIA_VIEWS_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(MIA_VIEWS_LESS_IMPORTS): $(MIA_VIEWS_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(MIA_VIEWS_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
