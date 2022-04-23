### Builds converse-models ###
# The following variables must be set (in addition to variables.mk):
# 1. BOARD_SCHEMA_MODELS_DIR
# 2. BOARD_SCHEMA_DIR_FILE

$(BOARD_MODELS_DIR): $(BOARD_MODELS_LIB_DIR)
	touch $@

$(BOARD_MODELS_LIB_DIR): $(BOARD_SCHEMA_DIR) \
                            $(BOARD_MODELS_TEMPLATE_DIR)\
		            $(BOARD_MODELS_CHECKS_DIR) \
		            $(BOARD_MODELS_SRC_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_MODELS_SRC_DIR)/* $@

	$(foreach d,$(BOARD_MODELS_MODEL_NAMES), \
	$(eval name=$(notdir $(basename $(d)))) \
	$(DAGEN) --templates $(BOARD_MODELS_TEMPLATE_DIR) \
	--template $(BOARD_MODELS_MODEL_TEMPLATE) \
	--check $(BOARD_MODELS_DIR)/checks/model.json \
	--check $(BOARD_MODELS_DIR)/checks/procedures.json \
	--check $(BOARD_MODELS_DIR)/checks/refs.json \
	--namespace models \
	$(BOARD_SCHEMA_MODELS_DIR)/$(name).json | $(TSFMT) --stdin > \
	$(BOARD_MODELS_LIB_DIR)/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true \

	$(DAGEN) --templates $(BOARD_MODELS_TEMPLATE_DIR) \
	--template $(BOARD_MODELS_INDEX_TEMPLATE) \
	--set models="$(BOARD_MODELS_MODEL_NAMES)" \
	--namespace models | \
	$(TSFMT) --stdin > \
	$(BOARD_MODELS_LIB_DIR)/index.ts

	$(TSC) --project $@
	touch $@

$(BOARD_MODELS_TEMPLATE_DIR): $(BOARD_MODELS_TEMPLATE_DIR_FILES)
	touch $@

$(BOARD_MODELS_CHECKS_DIR): $(BOARD_MODELS_CHECKS_DIR_FILES)
	touch $@

$(BOARD_MODELS_SRC_DIR): $(BOARD_MODELS_SRC_DIR_FILES)
	touch $@
