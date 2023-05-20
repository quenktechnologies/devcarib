BOARD_SCHEMA_DIR?=$(BOARD_DIR)/schema
BOARD_SCHEMA_TARGETS?=$(foreach name,$(notdir $(basename $(wildcard \
                      $(BOARD_SCHEMA_DIR)/*.json))),$(BOARD_SCHEMA_DIR)/$(name).json)

BOARD_SCHEMA_NAMES?=$(notdir $(basename $(BOARD_SCHEMA_TARGETS)))
BOARD_SCHEMA_TYPE_NAMES?=
BOARD_SCHEMA_MODEL_NAMES:=$(filter-out $(BOARD_SCHEMA_TYPE_NAMES),$(BOARD_SCHEMA_NAMES))

BOARD_SCHEMA_MODEL_TARGETS:=$(addsuffix .json,$(addprefix $(BOARD_SCHEMA_DIR)/,\
			    $(BOARD_SCHEMA_MODEL_NAMES)))
