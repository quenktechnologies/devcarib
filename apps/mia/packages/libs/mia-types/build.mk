### Builds mia-types ###

$(MIA_TYPES_DIR): $(MIA_TYPES_LIB_DIR)
	touch $@

$(MIA_TYPES_LIB_DIR): $(MIA_SCHEMA_DIR)\
                      $(MIA_TYPES_SRC_DIR)\
                      $(MIA_TYPES_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(MIA_TYPES_SRC_DIR)/* $@

	$(call types_mktypes,\
	$(MIA_TYPES_MODEL_NAMES),$(MIA_SCHEMA_MODELS_DIR))

	$(call types_mktypes,\
	$(MIA_TYPES_TYPE_NAMES),$(MIA_SCHEMA_TYPES_DIR))

	$(TSC) --project $@
	touch $@

$(MIA_TYPES_SRC_DIR): $(MIA_TYPES_SRC_DIR_FILES)
	touch $@

$(MIA_TYPES_TEMPLATE_DIR): $(MIA_TYPES_TEMPLATE_DIR_FILES)
	touch $@
