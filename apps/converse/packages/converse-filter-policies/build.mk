$(CONVERSE_FILTER_POLICIES_DIR): $(CONVERSE_FILTER_POLICIES_LIB_DIR)
	touch $@

$(CONVERSE_FILTER_POLICIES_LIB_DIR): $(CONVERSE_FILTER_POLICIES_SRC_DIR)\
                                     $(CONVERSE_FILTER_POLICIES_TEMPLATES_DIR)\
	                             $(CONVERSE_SCHEMA_MODELS_DIR) 
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(CONVERSE_FILTER_POLICIES_SRC_DIR)/* $@

	$(foreach schema,$(CONVERSE_FILTER_POLICIES_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(CONVERSE_FILTER_POLICIES_TEMPLATES_DIR) \
	--template model.nunjucks \
	--namespace policy\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(CONVERSE_FILTER_POLICIES_TEMPLATES_DIR) \
	--template index.nunjucks \
	--set models="$(CONVERSE_MODELS_MODEL_NAMES)" \
	--namespace filters | \
	$(TSFMT) --stdin > \
	$(CONVERSE_FILTER_POLICIES_LIB_DIR)/index.ts

	$(TSC) --project $@
	
	touch $@

$(CONVERSE_FILTER_POLICIES_SRC_DIR): $(CONVERSE_FILTER_POLICIES_SRC_DIR_FILES)
	touch $@

$(CONVERSE_FILTER_POLICIES_TEMPLATES_DIR): $(CONVERSE_FILTER_POLICIES_TEMPLATE_FILES)
	touch $@

$(CONVERSE_SCHEMA_MODELS_DIR): $(CONVERSE_FILTER_POLICIES_MODEL_FILES)
	touch $@
