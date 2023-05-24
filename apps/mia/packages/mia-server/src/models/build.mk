include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(MIA_MODELS_DIR): $(MIA_SCHEMA_DIR) \
	           $(MIA_TYPES_DIR)
	$(call qtl_mongodb_models,$@,$(MIA_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_models_index,$@,$(MIA_SCHEMA_MODEL_TARGETS))
