$(MIA_FRONTEND_DIR): $(MIA_FRONTEND_PUBLIC_DIR)\
                     $(MIA_FRONTEND_FRONTEND_TEST_DIR)
	touch $@

$(MIA_FRONTEND_PUBLIC_DIR): $(MIA_FRONTEND_CSS_FILE)\
                            $(MIA_FRONTEND_JS_FILE)
	touch $@

$(MIA_FRONTEND_JS_FILE): $(MIA_FRONTEND_LIB_DIR)
	mkdir -p $(dir $@)
	$(BROWSERIFY) -t envify $(MIA_FRONTEND_LIB_DIR)/main.js | \
	$(ENVIFY)\
	$(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS)) > $@

$(MIA_FRONTEND_LIB_DIR): $(MIA_FRONTEND_SRC_FILES)\
			 $(MIA_REMOTE_MODELS_DIR)\
			 $(DEVCARIB_FRONTEND_DIR)\
	                 $(DEVCARIB_WIDGETS_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(MIA_FRONTEND_SRC_DIR)/* $@
	$(WML) $@
	$(TSC) --project $@
	touch $@

include $(MIA_REMOTE_MODELS_DIR)/build.mk

$(MIA_FRONTEND_CSS_FILE): $(MIA_FRONTEND_LESS_IMPORTS) \
                             $(MIA_FRONTEND_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(MIA_FRONTEND_JS_VARS) $(MIA_FRONTEND_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(MIA_FRONTEND_LESS_IMPORTS): $(MIA_FRONTEND_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(MIA_FRONTEND_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true

$(MIA_FRONTEND_FRONTEND_TEST_DIR): $(MIA_FRONTEND_FRONTEND_TEST_BUNDLE_DIR)
	touch $@

$(MIA_FRONTEND_FRONTEND_TEST_BUNDLE_DIR): $(MIA_FRONTEND_FRONTEND_TEST_BUILD_DIR)
	rm -R $@ || true
	mkdir -p $@
	$(foreach test,$(shell find $(MIA_FRONTEND_FRONTEND_TEST_BUILD_DIR)\
	   -name \*.js), $(BROWSERIFY) $(test) > $@/$(notdir $(basename $(test))).js)

$(MIA_FRONTEND_FRONTEND_TEST_BUILD_DIR): $(MIA_FRONTEND_FRONTEND_TEST_SRC_DIR)
	rm -R $@ || true
	cp -R $(MIA_FRONTEND_FRONTEND_TEST_SRC_DIR) $@
	$(TSC) --project $@

$(MIA_FRONTEND_FRONTEND_TEST_SRC_DIR): $(MIA_FRONTEND_FRONTEND_TEST_SRC_DIR_FILES)
	touch $@
