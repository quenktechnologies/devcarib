# Builds a module containing mongodb projection definitions for each model 
# schema found in a project.

$(BOARD_FIELDS_DIR): $(BOARD_FIELDS_LIB_DIR)
	touch $@

$(BOARD_FIELDS_LIB_DIR): $(BOARD_SCHEMA_MODELS_DIR)\
                           $(BOARD_FIELDS_TEMPLATE_DIR)\
                           $(BOARD_FIELDS_SRC_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(BOARD_FIELDS_SRC_DIR)/* $@
	
	$(foreach schema,$(BOARD_FIELDS_MODEL_FILES),\
	$(eval name:=$(notdir $(basename $(schema))))\
	$(DAGEN) --templates $(BOARD_FIELDS_TEMPLATE_DIR) \
	--template $(BOARD_FIELDS_TEMPLATE) \
	--namespace fields\
	$(schema) | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true
	
	$(DAGEN) --templates $(BOARD_FIELDS_TEMPLATE_DIR) \
	--template $(BOARD_FIELDS_INDEX_TEMPLATE) \
	--set models="$(BOARD_MODELS_MODEL_NAMES)" \
	--namespace fields | \
	$(TSFMT) --stdin > \
	$(BOARD_FIELDS_LIB_DIR)/index.ts
	
	$(TSC) --project $@
	
	touch $@

$(BOARD_FIELDS_TEMPLATE_DIR): $(BOARD_FIELDS_TEMPLATE_FILES)
	touch $@

$(BOARD_FIELDS_SRC_DIR): $(BOARD_FIELDS_SRC_DIR_FILES)
	touch $@
