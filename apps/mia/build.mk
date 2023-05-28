
$(MIA_DIR): $(MIA_BUILD_DIR) $(MIA_SERVER_DIR)
	touch $@

$(MIA_BUILD_DIR): $(shell find $(MIA_DIR)/src -type f) \
                    $(shell find $(MIA_PACKAGES_DIR) -mindepth 1 \
                    -maxdepth 1 -type d) \
                    $(MIA_FRONTEND_DIR) \
                    $(MIA_PUBLIC_DIR)
	
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(MIA_DIR)/src/* $@
	$(WMLC) $@
	$(TDC) $@
	$(TSC) -p $@
	touch $@

include $(MIA_SCHEMA_DIR)/build.mk
include $(MIA_PACKAGES_DIR)/*/build.mk
include $(MIA_FRONTEND_DIR)/build.mk

$(MIA_PUBLIC_DIR): $(MIA_PUBLIC_DIR)/assets/css/mia.css
	touch $@

$(MIA_PUBLIC_DIR)/assets/css/mia.css: $(MIA_DIR)/imports.less \
                                      $(MIA_DIR)/main.less
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS) $(MIA_DIR)/main.less \
	$(if $(findstring yes,$(DEV)),,|$(CLEANCSS)) > $@

$(MIA_DIR)/imports.less: $(shell find $(MIA_DIR)/src -name \*.less)
	echo "" > $@
	$(foreach f,$(subst $(MIA_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
