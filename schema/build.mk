$(BOARD_SCHEMA_DIR): $(shell find $(BOARD_SCHEMA_DIR) -type f)
	touch $@