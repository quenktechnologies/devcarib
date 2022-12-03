$(BOARD_DIR): $(BOARD_BUILD_DIR) $(BOARD_FRONTEND_DIR) $(BOARD_PUBLIC_DIR)
	touch $@

$(BOARD_BUILD_DIR): $(BOARD_SRC_DIR)\
		    $(shell find $(BOARD_PACKAGES_DIR) -mindepth 1 \
	             -maxdepth 1 -type d)\
		    $(CONVERSE_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(BOARD_SRC_DIR)/* $@
	$(WMLC) $@
	$(TDC) $@
	$(TSC) -p $@
	touch $@

$(BOARD_SRC_DIR): $(BOARD_SRC_DIR_FILES)
	touch $@

include $(BOARD_SCHEMA_DIR)/build.mk
include $(BOARD_PACKAGES_DIR)/*/build.mk
include $(BOARD_FRONTEND_DIR)/build.mk

$(BOARD_PUBLIC_DIR): $(BOARD_CSS_FILE)
	touch $@

$(BOARD_CSS_FILE): $(BOARD_LESS_IMPORTS_FILE)\
                   $(BOARD_LESS_MAIN_FILE)\
                   $(DEVCARIB_WIDGETS_DIR)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS) $(BOARD_LESS_MAIN_FILE) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_LESS_IMPORTS_FILE): $(BOARD_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
