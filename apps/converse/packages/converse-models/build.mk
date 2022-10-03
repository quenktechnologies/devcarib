### Builds converse-models ###
# The following variables must be set (in addition to variables.mk):
# 1. CONVERSE_SCHEMA_MODELS_DIR
# 2. CONVERSE_SCHEMA_DIR_FILE

$(CONVERSE_MODELS_DIR): $(CONVERSE_MODELS_LIB_DIR)
	touch $@

$(CONVERSE_MODELS_LIB_DIR): $(CONVERSE_SCHEMA_DIR) \
                            $(CONVERSE_MODELS_TEMPLATE_DIR)\
		            $(CONVERSE_MODELS_CHECKS_DIR) \
		            $(CONVERSE_MODELS_SRC_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(CONVERSE_MODELS_SRC_DIR)/* $@

	$(foreach d,$(CONVERSE_MODELS_MODEL_NAMES), \
	$(eval name=$(notdir $(basename $(d)))) \
	$(DAGEN) --templates $(CONVERSE_MODELS_TEMPLATE_DIR) \
	--plugin $(DAGEN_PLUGIN_IMPORTS)\
	--template $(CONVERSE_MODELS_MODEL_TEMPLATE) \
	--check $(CONVERSE_MODELS_DIR)/checks/model.json \
	--check $(CONVERSE_MODELS_DIR)/checks/procedures.json \
	--check $(CONVERSE_MODELS_DIR)/checks/refs.json \
	--namespace models \
	$(CONVERSE_SCHEMA_MODELS_DIR)/$(name).json | $(TSFMT) --stdin > \
	$(CONVERSE_MODELS_LIB_DIR)/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true \

	$(DAGEN) --templates $(CONVERSE_MODELS_TEMPLATE_DIR) \
	--template $(CONVERSE_MODELS_INDEX_TEMPLATE) \
	--set models="$(CONVERSE_MODELS_MODEL_NAMES)" \
	--namespace models | \
	$(TSFMT) --stdin > \
	$(CONVERSE_MODELS_LIB_DIR)/index.ts

	$(TSC) --project $@
	touch $@

$(CONVERSE_MODELS_TEMPLATE_DIR): $(CONVERSE_MODELS_TEMPLATE_DIR_FILES)
	touch $@

$(CONVERSE_MODELS_CHECKS_DIR): $(CONVERSE_MODELS_CHECKS_DIR_FILES)
	touch $@

$(CONVERSE_MODELS_SRC_DIR): $(CONVERSE_MODELS_SRC_DIR_FILES)
	touch $@
