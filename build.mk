$(PROJECT_FILTER_POLICIES_DIR): $(PROJECT_FILTER_POLICIES_LIB_DIR)
	touch $@

$(PROJECT_FILTER_POLICIES_LIB_DIR): $(PROJECT_FILTER_POLICIES_SRC_DIR)\
                                    $(PROJECT_FILTER_POLICIES_TEMPLATES_DIR)\
	                            $(PROJECT_SCHEMA_MODELS_DIR) 
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(PROJECT_FILTER_POLICIES_SRC_DIR)/* $@

	$(foreach schema,$(PROJECT_FILTER_POLICIES_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(PROJECT_FILTER_POLICIES_TEMPLATES_DIR) \
	--template model.nunjucks \
	--namespace policy\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(PROJECT_FILTER_POLICIES_TEMPLATE_DIR) \
	--template $(PROJECT_FILTER_POLICIES_INDEX_TEMPLATE) \
	--set models="$(PROJECT_MODELS_MODEL_NAMES)" \
	--namespace filters | \
	$(TSFMT) --stdin > \
	$(PROJECT_FILTER_POLICIES_LIB_DIR)/index.ts

	$(TSC) --project $@
	
	touch $@

$(PROJECT_FILTER_POLICIES_SRC_DIR): $(PROJECT_FILTER_POLICIES_SRC_DIR_FILES)
	touch $@

$(PROJECT_FILTER_POLICIES_TEMPLATES_DIR): $(PROJECT_FILTER_POLICIES_TEMPLATE_FILES)
	touch $@
