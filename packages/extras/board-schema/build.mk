
BOARD_SCHEMA_MODELS_DIR?=$(BOARD_SCHEMA_DIR)/models
BOARD_SCHEMA_TYPES_DIR?=$(BOARD_SCHEMA_DIR)/types
BOARD_SCHEMA_DIR_FILES?=$(shell find $(BOARD_SCHEMA_DIR) -type f)

$(BOARD_SCHEMA_DIR): $(BOARD_SCHEMA_DIR_FILES)
	touch $@
