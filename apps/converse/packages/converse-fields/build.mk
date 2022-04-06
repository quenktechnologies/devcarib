# Builds a module containing mongodb projection definitions for each model 
# schema found in a project.

$(CONVERSE_FIELDS_DIR): $(CONVERSE_FIELDS_LIB_DIR)
	touch $@

$(CONVERSE_FIELDS_LIB_DIR): $(CONVERSE_SCHEMA_MODELS_DIR)\
                           $(CONVERSE_FIELDS_TEMPLATE_DIR)\
                           $(CONVERSE_FIELDS_SRC_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(CONVERSE_FIELDS_SRC_DIR)/* $@
	
	$(foreach schema,$(CONVERSE_FIELDS_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(CONVERSE_FIELDS_TEMPLATE_DIR) \
	--template $(CONVERSE_FIELDS_TEMPLATE) \
	--namespace fields\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(CONVERSE_FIELDS_TEMPLATE_DIR) \
	--template $(CONVERSE_FIELDS_INDEX_TEMPLATE) \
	--set models="$(CONVERSE_MODELS_MODEL_NAMES)" \
	--namespace fields | \
	$(TSFMT) --stdin > \
	$(CONVERSE_FIELDS_LIB_DIR)/index.ts
	
	$(TSC) --project $@
	
	touch $@

$(CONVERSE_FIELDS_TEMPLATE_DIR): $(CONVERSE_FIELDS_TEMPLATE_FILES)
	touch $@

$(CONVERSE_FIELDS_SRC_DIR): $(CONVERSE_FIELDS_SRC_DIR_FILES)
	touch $@
