include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(BOARD_MODELS_DIR): $(BOARD_SCHEMA_DIR) \
	             $(BOARD_TYPES_DIR)
	$(call qtl_mongodb_models,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_models_index,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
