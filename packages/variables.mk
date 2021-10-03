BOARD_TYPES_DIR:=$(BOARD_PACKAGES_DIR)/board-types
BOARD_COMMON_DIR:=$(BOARD_PACKAGES_DIR)/board-common
BOARD_VALIDATORS_DIR:=$(BOARD_PACKAGES_DIR)/board-validators
BOARD_CHECKS_DIR:=$(BOARD_PACKAGES_DIR)/board-checks
BOARD_VIEWS_DIR:=$(BOARD_PACKAGES_DIR)/board-views

include $(BOARD_PACKAGES_DIR)/devcarib-common-validators/variables.mk
include $(BOARD_PACKAGES_DIR)/devcarib-common-checks/variables.mk
include $(BOARD_PACKAGES_DIR)/devcarib-widgets/variables.mk
include $(BOARD_PACKAGES_DIR)/devcarib-server/variables.mk
include $(BOARD_PACKAGES_DIR)/board-types/variables.mk
