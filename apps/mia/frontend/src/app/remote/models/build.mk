include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(MIA_REMOTE_MODELS_DIR): $(MIA_SCHEMA_DIR) $(MIA_REMOTE_MODELS_FILES)
	$(call qtl_remote_models,$@,$(MIA_SCHEMA_MODEL_TARGETS))
	touch $@

$(MIA_REMOTE_MODELS_FILES):
	touch $@
