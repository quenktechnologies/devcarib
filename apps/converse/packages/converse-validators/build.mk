## Builds converse-validators. ###
# The following variables must be defined:
# 1. CONVERSE_VALIDATORS_SCHEMA_DIR
# 2. CONVERSE_SCHEMA_MODELS_DIR
# 3. CONVERSE_SCHEMA_TYPES_DIR

$(CONVERSE_VALIDATORS_DIR): $(CONVERSE_VALIDATORS_LIB_DIR)\
	                    $(CONVERSE_VALIDATORS_TEST_DIR)
	touch $@

$(CONVERSE_VALIDATORS_LIB_DIR):$(CONVERSE_SCHEMA_DIR)\
			       $(CONVERSE_TYPES_DIR)\
                               $(CONVERSE_VALIDATORS_SRC_DIR)\
                               $(CONVERSE_VALIDATORS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(CONVERSE_VALIDATORS_SRC_DIR)/* $@

	$(foreach d,$(CONVERSE_VALIDATORS_SRC_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(eval filename=$(shell $(TRANSFORM) -t modulecase $(name)))\
	 $(DAGEN) --templates $(CONVERSE_VALIDATORS_TEMPLATE_DIR) \
	 --template $(CONVERSE_VALIDATORS_TYPE_TEMPLATE) \
	 --namespace validators \
	 --namespace validation \
	 --set filename=$(filename)\
	 --plugin $(CONVERSE_VALIDATORS_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true \

	$(DAGEN) --templates $(CONVERSE_VALIDATORS_TEMPLATE_DIR) \
	--template $(CONVERSE_VALIDATORS_INDEX_TEMPLATE) \
	--set names="$(CONVERSE_VALIDATORS_SRC_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(CONVERSE_VALIDATORS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(CONVERSE_VALIDATORS_SRC_DIR): $(CONVERSE_VALIDATORS_SRC_DIR_FILES)
	touch $@

$(CONVERSE_VALIDATORS_TEMPLATE_DIR): $(CONVERSE_VALIDATORS_TEMPLATE_DIR_FILES)
	touch $@

$(CONVERSE_VALIDATORS_TEST_DIR): $(CONVERSE_VALIDATORS_UNIT_TEST_DIR)
	touch $@

$(CONVERSE_VALIDATORS_UNIT_TEST_DIR): $(CONVERSE_VALIDATORS_LIB_DIR) \
                                  $(CONVERSE_VALIDATORS_TEMPLATE_DIR_FILES)
	rm -R $@ || true
	mkdir -p $@ $(CONVERSE_VALIDATORS_EXTRA_TEST_DIR)
	
	$(foreach d,$(CONVERSE_VALIDATORS_SRC_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(eval filename=$(shell $(TRANSFORM) -t modulecase $(name)))\
	 $(DAGEN) --templates $(CONVERSE_VALIDATORS_TEMPLATE_DIR) \
	 --template $(CONVERSE_VALIDATORS_TEST_TEMPLATE) \
	 --namespace validators \
	 --namespace validation \
	 --set filename=$(filename)\
	 --plugin $(CONVERSE_VALIDATORS_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true \

	for f in $$(ls $@); \
	do \
	mv $@/$$f $@/$$(basename -s .ts $$f)_test.ts;\
	done
	cp -Rt $(CONVERSE_VALIDATORS_EXTRA_TEST_DIR) $@
	touch $@
