include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(CONVERSE_SEARCH_FILTERS_DIR): $(CONVERSE_SCHEMA_DIR) \
	                   $(CONVERSE_TYPES_DIR)
	$(call qtl_mongodb_search_filters,$@,$(CONVERSE_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_search_filters_index,$@,$(CONVERSE_SCHEMA_MODEL_TARGETS))
