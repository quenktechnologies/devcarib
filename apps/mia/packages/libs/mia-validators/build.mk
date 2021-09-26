### Build the validation package. ###

# The following variables must be defined:
# 1. MIA_VALIDATORS_DIR
# 2. MIA_VALIDATORS_SCHEMA_DIR
# 3. MIA_SCHEMA_MODELS_DIR
# 4. MIA_SCHEMA_TYPES_DIR

### Binaries ###
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
TRANSFORM?=node ./node_modules/.bin/transform

### Settings ###
MIA_VALIDATORS_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/validation
MIA_VALIDATORS_SRC_DIR:=$(MIA_VALIDATORS_DIR)/src
MIA_VALIDATORS_SRC_DIR_FILES:=$(shell find $(MIA_VALIDATORS_SRC_DIR) -type f)
MIA_VALIDATORS_LIB_DIR:=$(MIA_VALIDATORS_DIR)/lib

MIA_VALIDATORS_TEMPLATE_DIR:=$(MIA_VALIDATORS_DIR)/templates
MIA_VALIDATORS_TEMPLATE_DIR_FILES:=$(shell find \
				    $(MIA_VALIDATORS_TEMPLATE_DIR) -type f)
MIA_VALIDATORS_TYPE_TEMPLATE:=type.validators
MIA_VALIDATORS_INDEX_TEMPLATE:=index.validators

MIA_VALIDATORS_MODEL_FILES=$(wildcard $(MIA_SCHEMA_MODELS_DIR)/*.json)
MIA_VALIDATORS_TYPES_FILES=$(wildcard $(MIA_SCHEMA_TYPES_DIR)/*.json)
MIA_VALIDATORS_SRC_FILES=$(MIA_VALIDATORS_MODEL_FILES) \
			  $(MIA_VALIDATORS_TYPES_FILES)
MIA_VALIDATORS_SRC_FILES_NAMES=$(notdir $(basename \
				$(MIA_VALIDATORS_MODEL_FILES)))

# Test generation.
MIA_VALIDATORS_TEST_DIR:=$(MIA_VALIDATORS_DIR)/test
MIA_VALIDATORS_UNIT_TEST_DIR:=$(MIA_VALIDATORS_TEST_DIR)/unit
MIA_VALIDATORS_TEST_TEMPLATE:=test.validators
MIA_VALIDATORS_TEST_DATA_DIR:=$(MIA_VALIDATORS_TEST_DIR)/fixtures/data 
MIA_VALIDATORS_EXTRA_TEST_DIR:=$(MIA_VALIDATORS_TEST_DIR)/unitextras

# Hook into clean task.
MIA_CLEAN_TARGETS:=$(MIA_CLEAN_TARGETS)\
                       $(MIA_VALIDATORS_LIB_DIR)\
	               $(MIA_VALIDATORS_TEST_DIR)

# Add our sources to the list of total project sources.
MIA_SRC_DIRS:=$(MIA_SRC_DIRS)\
		  $(MIA_VALIDATORS_SRC_DIR)\
		  $(MIA_VALIDATORS_TEST_DATA_DIR)\
		  $(MIA_VALIDATORS_TEMPLATE_DIR)
  
### Graph ###

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
	mkdir -p $@
	
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
