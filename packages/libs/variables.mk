BOARD_LIBS_DIR:=$(PACKAGES_DIR)/libs

BOARD_TYPES_DIR:=$(BOARD_LIBS_DIR)/board-types
BOARD_COMMON_DIR:=$(BOARD_LIBS_DIR)/board-common
BOARD_VALIDATORS_DIR:=$(BOARD_LIBS_DIR)/board-validators
BOARD_CHECKS_DIR:=$(BOARD_LIBS_DIR)/board-checks
BOARD_SERVER_DIR:=$(BOARD_LIBS_DIR)/board-server
BOARD_VIEWS_DIR:=$(BOARD_LIBS_DIR)/board-views

include $(BOARD_LIBS_DIR)/devcarib-common-validators/variables.mk
include $(BOARD_LIBS_DIR)/devcarib-common-checks/variables.mk
include $(BOARD_LIBS_DIR)/devcarib-widgets/variables.mk
