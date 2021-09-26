### Build the validation package. ###

# The following variables must be defined:
# 1. BOARD_VALIDATORS_DIR
# 2. BOARD_VALIDATORS_SCHEMA_DIR
# 3. BOARD_SCHEMA_MODELS_DIR
# 4. BOARD_SCHEMA_TYPES_DIR

### Binaries ###
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
TRANSFORM?=node ./node_modules/.bin/transform

### Settings ###
BOARD_VALIDATORS_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/validation
BOARD_VALIDATORS_SRC_DIR:=$(BOARD_VALIDATORS_DIR)/src
BOARD_VALIDATORS_SRC_DIR_FILES:=$(shell find $(BOARD_VALIDATORS_SRC_DIR) -type f)
BOARD_VALIDATORS_LIB_DIR:=$(BOARD_VALIDATORS_DIR)/lib

BOARD_VALIDATORS_TEMPLATE_DIR:=$(BOARD_VALIDATORS_DIR)/templates
BOARD_VALIDATORS_TEMPLATE_DIR_FILES:=$(shell find \
				    $(BOARD_VALIDATORS_TEMPLATE_DIR) -type f)
BOARD_VALIDATORS_TYPE_TEMPLATE:=type.validators
BOARD_VALIDATORS_INDEX_TEMPLATE:=index.validators

BOARD_VALIDATORS_MODEL_FILES=$(wildcard $(BOARD_SCHEMA_MODELS_DIR)/*.json)
BOARD_VALIDATORS_TYPES_FILES=$(wildcard $(BOARD_SCHEMA_TYPES_DIR)/*.json)
BOARD_VALIDATORS_SRC_FILES=$(BOARD_VALIDATORS_MODEL_FILES) \
			  $(BOARD_VALIDATORS_TYPES_FILES)
BOARD_VALIDATORS_SRC_FILES_NAMES=$(notdir $(basename \
				$(BOARD_VALIDATORS_MODEL_FILES)))

# Test generation.
BOARD_VALIDATORS_TEST_DIR:=$(BOARD_VALIDATORS_DIR)/test
BOARD_VALIDATORS_UNIT_TEST_DIR:=$(BOARD_VALIDATORS_TEST_DIR)/unit
BOARD_VALIDATORS_TEST_TEMPLATE:=test.validators
BOARD_VALIDATORS_TEST_DATA_DIR:=$(BOARD_VALIDATORS_TEST_DIR)/fixtures/data 
BOARD_VALIDATORS_EXTRA_TEST_DIR:=$(BOARD_VALIDATORS_TEST_DIR)/unitextras

# Hook into clean task.
CLEAN_TARGETS:=$(CLEAN_TARGETS)\
               $(BOARD_VALIDATORS_LIB_DIR)\
	       $(BOARD_VALIDATORS_TEST_DIR)

SRC_DIRS:=$(SRC_DIRS)\
	  $(BOARD_VALIDATORS_SRC_DIR)\
	  $(BOARD_VALIDATORS_TEST_DATA_DIR)\
	  $(BOARD_VALIDATORS_TEMPLATE_DIR)
  
### Graph ###

$(BOARD_VALIDATORS_DIR): $(BOARD_VALIDATORS_LIB_DIR) $(BOARD_VALIDATORS_TEST_DIR)
	touch $@

$(BOARD_VALIDATORS_LIB_DIR): $(BOARD_SCHEMA_DIR)\
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
