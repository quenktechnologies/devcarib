### Builds mia-validators ###

$(MIA_VALIDATORS_DIR): $(MIA_VALIDATORS_LIB_DIR) $(MIA_VALIDATORS_TEST_DIR)
	touch $@

$(MIA_VALIDATORS_LIB_DIR): $(MIA_SCHEMA_DIR)\
			   $(MIA_TYPES_DIR)\
                           $(MIA_VALIDATORS_SRC_DIR)\
                           $(MIA_VALIDATORS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(MIA_VALIDATORS_SRC_DIR)/* $@

	$(foreach d,$(MIA_VALIDATORS_SRC_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(eval filename=$(shell $(TRANSFORM) -t modulecase $(name)))\
	 $(DAGEN) --templates $(MIA_VALIDATORS_TEMPLATE_DIR) \
	 --template $(MIA_VALIDATORS_TYPE_TEMPLATE) \
	 --namespace validators \
	 --namespace validation \
	 --set filename=$(filename)\
	 --plugin $(MIA_VALIDATORS_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true \

	$(DAGEN) --templates $(MIA_VALIDATORS_TEMPLATE_DIR) \
	--template $(MIA_VALIDATORS_INDEX_TEMPLATE) \
	--set names="$(MIA_VALIDATORS_SRC_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(MIA_VALIDATORS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(MIA_VALIDATORS_SRC_DIR): $(MIA_VALIDATORS_SRC_DIR_FILES)
	touch $@

$(MIA_VALIDATORS_TEMPLATE_DIR): $(MIA_VALIDATORS_TEMPLATE_DIR_FILES)
	touch $@

$(MIA_VALIDATORS_TEST_DIR): $(MIA_VALIDATORS_UNIT_TEST_DIR)
	touch $@

$(MIA_VALIDATORS_UNIT_TEST_DIR): $(MIA_VALIDATORS_LIB_DIR) \
                                 $(MIA_VALIDATORS_TEMPLATE_DIR_FILES)
	rm -R $@ || true
	mkdir -p $@ $(MIA_VALIDATORS_EXTRA_TEST_DIR)
	
	$(foreach d,$(MIA_VALIDATORS_SRC_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(eval filename=$(shell $(TRANSFORM) -t modulecase $(name)))\
	 $(DAGEN) --templates $(MIA_VALIDATORS_TEMPLATE_DIR) \
	 --template $(MIA_VALIDATORS_TEST_TEMPLATE) \
	 --namespace validators \
	 --namespace validation \
	 --set filename=$(filename)\
	 --plugin $(MIA_VALIDATORS_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true \

	for f in $$(ls $@); \
	do \
	mv $@/$$f $@/$$(basename -s .ts $$f)_test.ts;\
	done
	cp -Rt $(MIA_VALIDATORS_EXTRA_TEST_DIR) $@
	touch $@
