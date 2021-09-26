### Builds converse-models ###
# The following variables must be set (in addition to variables.mk):
# 1. MIA_SCHEMA_MODELS_DIR
# 2. MIA_SCHEMA_DIR_FILE

$(MIA_MODELS_DIR): $(MIA_MODELS_LIB_DIR)
	touch $@

$(MIA_MODELS_LIB_DIR): $(MIA_SCHEMA_DIR) \
                            $(MIA_MODELS_TEMPLATE_DIR)\
		            $(MIA_MODELS_CHECKS_DIR) \
		            $(MIA_MODELS_SRC_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(MIA_MODELS_SRC_DIR)/* $@

	$(foreach d,$(MIA_MODELS_MODEL_NAMES), \
	$(eval name=$(notdir $(basename $(d)))) \
	$(DAGEN) --templates $(MIA_MODELS_TEMPLATE_DIR) \
	--template $(MIA_MODELS_MODEL_TEMPLATE) \
	--check $(MIA_MODELS_DIR)/checks/model.json \
	--check $(MIA_MODELS_DIR)/checks/procedures.json \
	--check $(MIA_MODELS_DIR)/checks/refs.json \
	--namespace models \
	$(MIA_SCHEMA_MODELS_DIR)/$(name).json | $(TSFMT) --stdin > \
	$(MIA_MODELS_LIB_DIR)/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true \

	$(DAGEN) --templates $(MIA_MODELS_TEMPLATE_DIR) \
	--template $(MIA_MODELS_INDEX_TEMPLATE) \
	--set models="$(MIA_MODELS_MODEL_NAMES)" \
	--namespace models | \
	$(TSFMT) --stdin > \
	$(MIA_MODELS_LIB_DIR)/index.ts

	$(TSC) --project $@
	touch $@

$(MIA_MODELS_TEMPLATE_DIR): $(MIA_MODELS_TEMPLATE_DIR_FILES)
	touch $@

$(MIA_MODELS_CHECKS_DIR): $(MIA_MODELS_CHECKS_DIR_FILES)
	touch $@

$(MIA_MODELS_SRC_DIR): $(MIA_MODELS_SRC_DIR_FILES)
	touch $@
