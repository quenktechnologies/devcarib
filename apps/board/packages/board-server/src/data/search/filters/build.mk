$(BOARD_SEARCH_FILTERS_DIR): $(BOARD_SCHEMA_DIR) \
	                     $(BOARD_TYPES_DIR)
	$(call qtl_mongodb_search_filters,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_search_filters_index,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
