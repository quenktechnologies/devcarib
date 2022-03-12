# Builds a module containing mongodb projection definitions for each model 
# schema found in a project.

$(PROJECT_FIELDS_DIR): $(PROJECT_FIELDS_LIB_DIR)
	touch $@

$(PROJECT_FIELDS_LIB_DIR): $(PROJECT_SCHEMA_MODELS_DIR)\
                           $(PROJECT_FIELDS_TEMPLATE_DIR)\
                           $(PROJECT_FIELDS_SRC_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(PROJECT_FIELDS_SRC_DIR)/* $@
	
	$(foreach schema,$(PROJECT_FIELDS_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(PROJECT_FIELDS_TEMPLATE_DIR) \
	--template $(PROJECT_FIELDS_TEMPLATE) \
	--namespace fields\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(PROJECT_FIELDS_TEMPLATE_DIR) \
	--template $(PROJECT_FIELDS_INDEX_TEMPLATE) \
	--set models="$(PROJECT_MODELS_MODEL_NAMES)" \
	--namespace fields | \
	$(TSFMT) --stdin > \
	$(PROJECT_FIELDS_LIB_DIR)/index.ts
	
	$(TSC) --project $@
	
	touch $@

$(PROJECT_FIELDS_TEMPLATE_DIR): $(PROJECT_FIELDS_TEMPLATE_FILES)
	touch $@

$(PROJECT_FIELDS_SRC_DIR): $(PROJECT_FIELDS_SRC_DIR_FILES)
	touch $@
