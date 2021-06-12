$(PROJECT_SCHEMA_DIR): $(BOARD_SCHEMA_DIR)
	touch $@

include $(BOARD_SCHEMA_DIR)/build.mk
