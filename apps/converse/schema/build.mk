$(CONVERSE_SCHEMA_DIR): $(shell find $(CONVERSE_SCHEMA_DIR) -type f)
	touch $@
