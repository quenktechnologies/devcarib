### Builds mia-types ###

# Make type files for schema in a dir.
# $1 List of types to process
# $2 The path to the dir the files are in.
define mktypes
$(foreach d,$1,\
  $(eval name=$(notdir $(basename $(d)))) \
  $(DAGEN) --templates $(BOARD_TYPES_TEMPLATE_DIR) \
  --template $(BOARD_TYPES_TYPE_TEMPLATE) \
  --namespace types \
  $2/$(name).json | $(TSFMT) --stdin > \
  $(BOARD_TYPES_LIB_DIR)/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true
endef

$(BOARD_TYPES_DIR): $(BOARD_TYPES_LIB_DIR)
	touch $@

$(BOARD_TYPES_LIB_DIR): $(BOARD_SCHEMA_DIR)\
                      $(BOARD_TYPES_SRC_DIR)\
                      $(BOARD_TYPES_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_TYPES_SRC_DIR)/* $@

	$(call mktypes,\
	$(BOARD_TYPES_MODEL_NAMES),$(BOARD_SCHEMA_MODELS_DIR))

	$(call mktypes,\
	$(BOARD_TYPES_TYPE_NAMES),$(BOARD_SCHEMA_TYPES_DIR))

	$(TSC) --project $@
	touch $@

$(BOARD_TYPES_SRC_DIR): $(BOARD_TYPES_SRC_DIR_FILES)
	touch $@

$(BOARD_TYPES_TEMPLATE_DIR): $(BOARD_TYPES_TEMPLATE_DIR_FILES)
	touch $@
