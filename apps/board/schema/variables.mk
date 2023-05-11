BOARD_SCHEMA_DIR?=$(BOARD_DIR)/schema
BOARD_SCHEMA_TARGETS?= $(foreach name,$(notdir $(basename $(wildcard \
                       $(BOARD_SCHEMA_DIR)/*.json))),schema/$(name).json)
BOARD_SCHEMA_NAMES?=$(notdir $(basename $(BOARD_SCHEMA_TARGETS)))
BOARD_SCHEMA_DELIMITED_NAMES?=$(shell echo $(BOARD_SCHEMA_NAMES) | sed / /,/g)

