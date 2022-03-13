# Builds a module containing mongodb projection definitions for each model 
# schema found in a project.

$(MIA_FIELDS_DIR): $(MIA_FIELDS_LIB_DIR)
	touch $@

$(MIA_FIELDS_LIB_DIR): $(MIA_SCHEMA_MODELS_DIR)\
                           $(MIA_FIELDS_TEMPLATE_DIR)\
                           $(MIA_FIELDS_SRC_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(MIA_FIELDS_SRC_DIR)/* $@
	
	$(foreach schema,$(MIA_FIELDS_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(MIA_FIELDS_TEMPLATE_DIR) \
	--template $(MIA_FIELDS_TEMPLATE) \
	--namespace fields\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(MIA_FIELDS_TEMPLATE_DIR) \
	--template $(MIA_FIELDS_INDEX_TEMPLATE) \
	--set models="$(MIA_MODELS_MODEL_NAMES)" \
	--namespace fields | \
	$(TSFMT) --stdin > \
	$(MIA_FIELDS_LIB_DIR)/index.ts
	
	$(TSC) --project $@
	
	touch $@

$(MIA_FIELDS_TEMPLATE_DIR): $(MIA_FIELDS_TEMPLATE_FILES)
	touch $@

$(MIA_FIELDS_SRC_DIR): $(MIA_FIELDS_SRC_DIR_FILES)
	touch $@
