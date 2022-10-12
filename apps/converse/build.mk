$(CONVERSE_DIR): $(CONVERSE_BUILD_DIR)\
		 $(CONVERSE_FRONTEND_DIR)\
		 $(CONVERSE_PUBLIC_DIR)
	touch $@

$(CONVERSE_BUILD_DIR): $(CONVERSE_SRC_DIR)\
                       $(shell find $(CONVERSE_PACKAGES_DIR) -mindepth 1 \
	                -maxdepth 1 -type d)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(CONVERSE_SRC_DIR)/* $@
	$(WMLC) $@
	$(TDC) $(CONVERSE_BUILD_DIR)
	$(TSC) -p $@
	touch $(CONVERSE_BUILD_DIR)

$(CONVERSE_SRC_DIR): $(CONVERSE_SRC_DIR_FILES)
	touch $@

include $(CONVERSE_SCHEMA_DIR)/build.mk
include $(CONVERSE_PACKAGES_DIR)/*/build.mk
include $(CONVERSE_FRONTEND_DIR)/build.mk

$(CONVERSE_PUBLIC_DIR): $(CONVERSE_CSS_FILE)
	touch $@

$(CONVERSE_CSS_FILE): $(CONVERSE_LESS_IMPORTS_FILE)\
                      $(CONVERSE_LESS_MAIN_FILE)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS) $(CONVERSE_LESS_MAIN_FILE) \
	| ./node_modules/.bin/cleancss > $@

$(CONVERSE_LESS_IMPORTS_FILE): $(CONVERSE_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(CONVERSE_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
