$(MIA_FILTER_POLICIES_DIR): $(MIA_FILTER_POLICIES_LIB_DIR)
	touch $@

$(MIA_FILTER_POLICIES_LIB_DIR): $(MIA_FILTER_POLICIES_SRC_DIR)\
                                $(MIA_FILTER_POLICIES_TEMPLATES_DIR)\
	                        $(MIA_SCHEMA_MODELS_DIR) 
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(MIA_FILTER_POLICIES_SRC_DIR)/* $@

	$(foreach schema,$(MIA_FILTER_POLICIES_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(MIA_FILTER_POLICIES_TEMPLATES_DIR) \
	--template model.nunjucks \
	--namespace policy\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(MIA_FILTER_POLICIES_TEMPLATES_DIR) \
	--template index.nunjucks \
	--set models="$(MIA_MODELS_MODEL_NAMES)" \
	--namespace filters | \
	$(TSFMT) --stdin > \
	$(MIA_FILTER_POLICIES_LIB_DIR)/index.ts

	$(TSC) --project $@
	
	touch $@

$(MIA_FILTER_POLICIES_SRC_DIR): $(MIA_FILTER_POLICIES_SRC_DIR_FILES)
	touch $@

$(MIA_FILTER_POLICIES_TEMPLATES_DIR): $(MIA_FILTER_POLICIES_TEMPLATE_FILES)
	touch $@
