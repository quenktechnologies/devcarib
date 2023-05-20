$(BOARD_SEARCH_FIELDS_DIR): $(BOARD_SCHEMA_DIR) \
	                    $(BOARD_TYPES_DIR)
	$(call qtl_mongodb_search_fields,@,$(BOARD_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_search_fields_index,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
