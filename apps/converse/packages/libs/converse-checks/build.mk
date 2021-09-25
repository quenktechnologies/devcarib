### Builds converse-checks. ###
# 1. CONVERSE_CHECKS_DIR
# 2. CONVERSE_SCHEMA_MODELS_DIR

$(CONVERSE_CHECKS_DIR): $(CONVERSE_CHECKS_LIB_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(CONVERSE_CHECKS_LIB_DIR): $(CONVERSE_SCHEMA_DIR)\
                            $(CONVERSE_CHECKS_SRC_DIR)\
                            $(CONVERSE_CHECKS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(CONVERSE_CHECKS_SRC_DIR)/* $@

	$(foreach d,$(CONVERSE_CHECKS_MODEL_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(DAGEN) --templates $(CONVERSE_CHECKS_TEMPLATE_DIR) \
	 --template $(CONVERSE_CHECKS_TYPE_TEMPLATE) \
	 --namespace validation \
	 --namespace validators \
	 --namespace checks \
	 --plugin $(VALIDATION_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true

	$(DAGEN) --templates $(CONVERSE_CHECKS_TEMPLATE_DIR) \
	--template $(CONVERSE_CHECKS_INDEX_TEMPLATE) \
	--set names="$(CONVERSE_CHECKS_MODEL_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(CONVERSE_CHECKS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(CONVERSE_CHECKS_SRC_DIR): $(CONVERSE_CHECKS_SRC_DIR_FILES)
	touch $@

$(CONVERSE_CHECKS_TEMPLATE_DIR): $(CONVERSE_CHECKS_TEMPLATE_DIR_FILES)
	touch $@
