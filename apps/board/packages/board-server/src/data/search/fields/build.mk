include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(BOARD_SEARCH_FIELDS_DIR): $(BOARD_SCHEMA_DIR) \
	                    $(BOARD_TYPES_DIR)
	$(call qtl_mongodb_fields,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_fields_index,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
