
$(CONVERSE_DIR): $(CONVERSE_BUILD_DIR) $(CONVERSE_SERVER_DIR)
	touch $@

$(CONVERSE_BUILD_DIR): $(shell find $(CONVERSE_DIR)/src -type f) \
                    $(shell find $(CONVERSE_PACKAGES_DIR) -mindepth 1 \
                    -maxdepth 1 -type d) \
                    $(CONVERSE_FRONTEND_DIR) \
                    $(CONVERSE_PUBLIC_DIR) \
		    $(CONVERSE_SERVER_DIR)
	
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(CONVERSE_DIR)/src/* $@
	$(WMLC) $@
	$(TDC) $@
	$(TSC) -p $@
	touch $@

include $(CONVERSE_SCHEMA_DIR)/build.mk
include $(CONVERSE_PACKAGES_DIR)/*/build.mk
include $(CONVERSE_FRONTEND_DIR)/build.mk

$(CONVERSE_PUBLIC_DIR): $(CONVERSE_PUBLIC_DIR)/assets/css/mia.css
	touch $@

$(CONVERSE_PUBLIC_DIR)/assets/css/mia.css: $(CONVERSE_DIR)/imports.less \
                                      $(CONVERSE_DIR)/main.less
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS) $(CONVERSE_DIR)/main.less \
	$(if $(findstring yes,$(DEV)),,|$(CLEANCSS)) > $@

$(CONVERSE_DIR)/imports.less: $(shell find $(CONVERSE_DIR)/src -name \*.less)
	echo "" > $@
	$(foreach f,$(subst $(CONVERSE_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
