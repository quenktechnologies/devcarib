$(BOARD_JOB_FORM_DIR): $(BOARD_JOB_FORM_PUBLIC_DIR)
	touch $@

$(BOARD_JOB_FORM_PUBLIC_DIR): $(BOARD_JOB_FORM_JS_FILE) \
	                      $(BOARD_JOB_FORM_CSS_FILE)
	touch $@

$(BOARD_JOB_FORM_JS_FILE): $(shell find $(BOARD_JOB_FORM_DIR)/src \
	                              -name \*.ts -o -name \*.tsx)
	mkdir -p $(dir $@)
	$(ESBUILD) $(BOARD_JOB_FORM_DIR)/src/index.tsx --bundle --target=es6 \
	$(if $(findstring yes,$(DEV)),, --minify) > $@

$(BOARD_JOB_FORM_CSS_FILE): $(BOARD_JOB_FORM_DIR)/imports.scss \
	                    $(BOARD_JOB_FORM_DIR)/main.scss
	mkdir -p $(dir $@)
	$(SASSC) $(BOARD_JOB_FORM_DIR)/main.scss > $@

$(BOARD_JOB_FORM_DIR)/imports.scss: $(BOARD_JOB_FORM_CSS_IMPORTS)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_JOB_FORM_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
