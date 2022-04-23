$(BOARD_FILTER_POLICIES_DIR): $(BOARD_FILTER_POLICIES_LIB_DIR)
	touch $@

$(BOARD_FILTER_POLICIES_LIB_DIR): $(BOARD_FILTER_POLICIES_SRC_DIR)\
                                  $(BOARD_FILTER_POLICIES_TEMPLATES_DIR)\
	                          $(BOARD_SCHEMA_MODELS_DIR) 
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(BOARD_FILTER_POLICIES_SRC_DIR)/* $@

	$(foreach schema,$(BOARD_FILTER_POLICIES_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(BOARD_FILTER_POLICIES_TEMPLATES_DIR) \
	--template model.nunjucks \
	--namespace policy\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(BOARD_FILTER_POLICIES_TEMPLATES_DIR) \
	--template index.nunjucks \
	--set models="$(BOARD_MODELS_MODEL_NAMES)" \
	--namespace filters | \
	$(TSFMT) --stdin > \
	$(BOARD_FILTER_POLICIES_LIB_DIR)/index.ts

	$(TSC) --project $@
	
	touch $@

$(BOARD_FILTER_POLICIES_SRC_DIR): $(BOARD_FILTER_POLICIES_SRC_DIR_FILES)
	touch $@

$(BOARD_FILTER_POLICIES_TEMPLATES_DIR): $(BOARD_FILTER_POLICIES_TEMPLATE_FILES)
	touch $@

$(BOARD_SCHEMA_MODELS_DIR): $(BOARD_FILTER_POLICIES_MODEL_FILES)
	touch $@
