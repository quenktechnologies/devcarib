include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(CONVERSE_REMOTE_MODELS_DIR): $(CONVERSE_SCHEMA_DIR) $(CONVERSE_REMOTE_MODELS_FILES)
	$(call qtl_remote_models,$@,$(CONVERSE_SCHEMA_MODEL_TARGETS))

$(CONVERSE_REMOTE_MODELS_FILES):
	touch $@
