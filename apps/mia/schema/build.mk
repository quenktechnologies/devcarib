$(MIA_SCHEMA_DIR): $(shell find $(MIA_SCHEMA_DIR) -type f)
	touch $@
