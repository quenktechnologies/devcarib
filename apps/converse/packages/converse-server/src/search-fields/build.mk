include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(CONVERSE_SEARCH_FIELDS_DIR): $(CONVERSE_SCHEMA_DIR) \
	                  $(CONVERSE_TYPES_DIR)
	$(call qtl_mongodb_fields,$@,$(CONVERSE_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_fields_index,$@,$(CONVERSE_SCHEMA_MODEL_TARGETS))
	touch $@
