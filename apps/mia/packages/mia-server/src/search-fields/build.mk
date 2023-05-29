include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(MIA_SEARCH_FIELDS_DIR): $(MIA_SCHEMA_DIR) \
	                  $(MIA_TYPES_DIR)
	$(call qtl_mongodb_fields,$@,$(MIA_SCHEMA_MODEL_TARGETS))
	$(call qtl_mongodb_fields_index,$@,$(MIA_SCHEMA_MODEL_TARGETS))
	touch $@
