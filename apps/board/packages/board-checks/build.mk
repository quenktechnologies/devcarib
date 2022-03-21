$(BOARD_CHECKS_DIR): $(BOARD_CHECKS_LIB_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(BOARD_CHECKS_LIB_DIR):$(BOARD_VALIDATORS_DIR)\
	                $(DEVCARIB_COMMON_DIR)\
	                $(BOARD_SCHEMA_DIR)\
                        $(BOARD_CHECKS_SRC_DIR)\
                        $(BOARD_CHECKS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(BOARD_CHECKS_SRC_DIR)/* $@

	$(foreach d,$(BOARD_CHECKS_MODEL_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(DAGEN) --templates $(BOARD_CHECKS_TEMPLATE_DIR) \
	 --template $(BOARD_CHECKS_TYPE_TEMPLATE) \
	 --namespace validation \
	 --namespace validators \
	 --namespace checks \
	 --plugin $(VALIDATION_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true

	$(DAGEN) --templates $(BOARD_CHECKS_TEMPLATE_DIR) \
	--template $(BOARD_CHECKS_INDEX_TEMPLATE) \
	--set names="$(BOARD_CHECKS_MODEL_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(BOARD_CHECKS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(BOARD_CHECKS_SRC_DIR): $(BOARD_CHECKS_SRC_DIR_FILES)
	touch $@

$(BOARD_CHECKS_TEMPLATE_DIR): $(BOARD_CHECKS_TEMPLATE_DIR_FILES)
	touch $@
