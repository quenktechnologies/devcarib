include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(MIA_SEARCH_FILTERS_DIR): $(MIA_SCHEMA_DIR) \
	                   $(MIA_TYPES_DIR)
	$(call qtl_mongodb_search_filters,$@,$(MIA_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_search_filters_index,$@,$(MIA_SCHEMA_MODEL_TARGETS))
