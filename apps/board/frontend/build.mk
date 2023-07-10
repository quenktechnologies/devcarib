$(BOARD_JOB_FORM_DIR): $(BOARD_JOB_FORM_PUBLIC_DIR)
	touch $@

$(BOARD_JOB_FORM_PUBLIC_DIR): $(BOARD_JOB_FORM_JS_FILE) \
	                      $(BOARD_JOB_FORM_CSS_FILE)
	touch $@

$(BOARD_JOB_FORM_JS_FILE): $(BOARD_JOB_FORM_DIR)/lib
	mkdir -p $(dir $@)
	$(ESBUILD) $(BOARD_JOB_FORM_DIR)/lib/index.tsx \
	        --bundle  \
		--target=es6 \
		$(if $(findstring yes,$(DEV)),, --minify) > $@

$(BOARD_JOB_FORM_DIR)/lib: $(shell find $(BOARD_JOB_FORM_DIR)/src \
	                              -name \*.ts -o -name \*.tsx) \
			   $(BOARD_SERVER_DIR) \
			   $(BOARD_REMOTE_MODELS_DIR)
	rm -R $@ 2> /dev/null || true
	mkdir $@
	cp -R -u $(BOARD_JOB_FORM_DIR)/src/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_JOB_FORM_CSS_FILE): $(BOARD_JOB_FORM_DIR)/imports.scss \
	                    $(BOARD_JOB_FORM_DIR)/main.scss
	mkdir -p $(dir $@)
	$(SASSC) $(BOARD_JOB_FORM_DIR)/main.scss > $@

$(BOARD_JOB_FORM_DIR)/imports.scss: $(BOARD_JOB_FORM_CSS_IMPORTS)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_JOB_FORM_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true

include $(BOARD_JOB_FORM_DIR)/src/models/build.mk
