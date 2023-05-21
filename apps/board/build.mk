
$(BOARD_DIR): $(BOARD_BUILD_DIR)
	touch $@

$(BOARD_BUILD_DIR): $(shell find $(BOARD_DIR)/src -type f) \
                    $(shell find $(BOARD_PACKAGES_DIR) -mindepth 1 \
                    -maxdepth 1 -type d) \
                    $(BOARD_FRONTEND_DIR) \
                    $(BOARD_PUBLIC_DIR)
	
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(BOARD_DIR)/src/* $@
	$(WMLC) $@
	$(TDC) $@
	$(TSC) -p $@
	touch $@

include $(BOARD_SCHEMA_DIR)/build.mk
include $(BOARD_PACKAGES_DIR)/*/build.mk
include $(BOARD_FRONTEND_DIR)/build.mk

$(BOARD_PUBLIC_DIR): $(BOARD_PUBLIC_DIR)/assets/css/board.css
	touch $@

$(BOARD_PUBLIC_DIR)/assets/css/board.css: $(BOARD_DIR)/imports.less \
                                          $(BOARD_DIR)/main.less \
                                          $(BOARD_WIDGETS_DIR)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS) $(BOARD_DIR)/main.less \
	$(if $(findstring yes,$(DEV)),,|$(CLEANCSS)) > $@

$(BOARD_DIR)/imports.less: $(shell find $(BOARD_DIR)/src -name \*.less)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
