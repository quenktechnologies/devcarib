$(MIA_CHECKS_DIR): $(MIA_CHECKS_LIB_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(MIA_CHECKS_LIB_DIR): $(MIA_SCHEMA_DIR)\
                        $(MIA_CHECKS_SRC_DIR)\
                        $(MIA_CHECKS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(MIA_CHECKS_SRC_DIR)/* $@

	$(foreach d,$(MIA_CHECKS_MODEL_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(DAGEN) --templates $(MIA_CHECKS_TEMPLATE_DIR) \
	 --template $(MIA_CHECKS_TYPE_TEMPLATE) \
	 --namespace validation \
	 --namespace validators \
	 --namespace checks \
	 --plugin $(VALIDATION_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true

	$(DAGEN) --templates $(MIA_CHECKS_TEMPLATE_DIR) \
	--template $(MIA_CHECKS_INDEX_TEMPLATE) \
	--set names="$(MIA_CHECKS_MODEL_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(MIA_CHECKS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(MIA_CHECKS_SRC_DIR): $(MIA_CHECKS_SRC_DIR_FILES)
	touch $@

$(MIA_CHECKS_TEMPLATE_DIR): $(MIA_CHECKS_TEMPLATE_DIR_FILES)
	touch $@
