$(PROJECT_SCHEMA_DIR): $(BOARD_SCHEMA_DIR)
	touch $@

include $(PROJECT_SCHEMA_DIR)/board-schema/build.mk
