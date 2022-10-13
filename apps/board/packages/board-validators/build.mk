$(BOARD_VALIDATORS_DIR): $(BOARD_VALIDATORS_LIB_DIR)\
                         $(BOARD_VALIDATORS_TEST_DIR)
	touch $@

$(BOARD_VALIDATORS_LIB_DIR):$(BOARD_SCHEMA_DIR)\
			       $(BOARD_TYPES_DIR)\
                               $(BOARD_VALIDATORS_SRC_DIR)\
                               $(BOARD_VALIDATORS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(BOARD_VALIDATORS_SRC_DIR)/* $@

	$(foreach d,$(BOARD_VALIDATORS_SRC_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(eval filename=$(shell $(TRANSFORM) -t modulecase $(name)))\
	 $(DAGEN) --templates $(BOARD_VALIDATORS_TEMPLATE_DIR) \
	 --template $(BOARD_VALIDATORS_TYPE_TEMPLATE) \
	 --namespace validators \
	 --namespace validation \
	 --set filename=$(filename)\
	 --plugin $(BOARD_VALIDATORS_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true \

	$(DAGEN) --templates $(BOARD_VALIDATORS_TEMPLATE_DIR) \
	--template $(BOARD_VALIDATORS_INDEX_TEMPLATE) \
	--set names="$(BOARD_VALIDATORS_SRC_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(BOARD_VALIDATORS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(BOARD_VALIDATORS_SRC_DIR): $(BOARD_VALIDATORS_SRC_DIR_FILES)
	touch $@

$(BOARD_VALIDATORS_TEMPLATE_DIR): $(BOARD_VALIDATORS_TEMPLATE_DIR_FILES)
	touch $@

$(BOARD_VALIDATORS_TEST_DIR): $(BOARD_VALIDATORS_UNIT_TEST_DIR)
	touch $@

$(BOARD_VALIDATORS_UNIT_TEST_DIR): $(BOARD_VALIDATORS_LIB_DIR) \
                                  $(BOARD_VALIDATORS_TEMPLATE_DIR_FILES)
	rm -R $@ || true
	mkdir -p $@ $(BOARD_VALIDATORS_EXTRA_TEST_DIR)
	
	$(foreach d,$(BOARD_VALIDATORS_SRC_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(eval filename=$(shell $(TRANSFORM) -t modulecase $(name)))\
	 $(DAGEN) --templates $(BOARD_VALIDATORS_TEMPLATE_DIR) \
	 --template $(BOARD_VALIDATORS_TEST_TEMPLATE) \
	 --namespace validators \
	 --namespace validation \
	 --set filename=$(filename)\
	 --plugin $(BOARD_VALIDATORS_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true \

	for f in $$(ls $@); \
	do \
	mv $@/$$f $@/$$(basename -s .ts $$f)_test.ts;\
	done
	cp -Rt $(BOARD_VALIDATORS_EXTRA_TEST_DIR) $@
	touch $@
