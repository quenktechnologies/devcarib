MIA_SCHEMA_DIR?=$(MIA_DIR)/schema
MIA_SCHEMA_TARGETS?=$(foreach name,$(notdir $(basename $(wildcard \
                      $(MIA_SCHEMA_DIR)/*.json))),$(MIA_SCHEMA_DIR)/$(name).json)

MIA_SCHEMA_NAMES?=$(notdir $(basename $(MIA_SCHEMA_TARGETS)))
MIA_SCHEMA_TYPE_NAMES?=login
MIA_SCHEMA_MODEL_NAMES:=$(filter-out $(MIA_SCHEMA_TYPE_NAMES),$(MIA_SCHEMA_NAMES))

MIA_SCHEMA_MODEL_TARGETS:=$(addsuffix .json,$(addprefix $(MIA_SCHEMA_DIR)/,\
			  $(MIA_SCHEMA_MODEL_NAMES)))

MIA_SCHEMA_FILES:=$(addsuffix .json,$(addprefix $(MIA_SCHEMA_DIR)/,\
                  $(MIA_SCHEMA_NAMES)))
