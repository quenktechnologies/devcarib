BOARD_CHECKS_DIR:=$(BOARD_PACKAGES_DIR)/board-checks
BOARD_CHECKS_LIB_DIR:=$(BOARD_CHECKS_DIR)/lib
BOARD_CHECKS_SRC_DIR:=$(BOARD_CHECKS_DIR)/src
BOARD_CHECKS_SRC_DIR_FILES:=$(shell find $(BOARD_CHECKS_SRC_DIR) -type f)

# Directory with dagen templates.
BOARD_CHECKS_TEMPLATE_DIR:=$(BOARD_CHECKS_DIR)/templates
BOARD_CHECKS_TEMPLATE_DIR_FILES:=$(shell find $(BOARD_CHECKS_TEMPLATE_DIR)\
                                     -type f)
BOARD_CHECKS_TYPE_TEMPLATE:=type.checks
BOARD_CHECKS_INDEX_TEMPLATE:=index.checks

BOARD_CHECKS_MODEL_FILES=$(wildcard $(BOARD_SCHEMA_MODELS_DIR)/*.json)
BOARD_CHECKS_MODEL_FILES_NAMES=$(notdir $(basename \
					$(BOARD_CHECKS_MODEL_FILES)))

# Hook into clean task.
CLEAN_TARGETS:=$(CLEAN_TARGETS) $(BOARD_CHECKS_LIB_DIR)

# Add our sources to the list of total project sources.
SRC_DIRS:=$(SRC_DIRS)\
          $(BOARD_CHECKS_SRC_DIR)\
          $(BOARD_CHECKS_TEMPLATE_DIR)

VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/checks
