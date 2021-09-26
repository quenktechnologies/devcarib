DEVCARIB_WIDGETS_DIR:=$(PACKAGES_LIBS_DIR)/devcarib-widgets
DEVCARIB_WIDGETS_SRC_DIR:=$(DEVCARIB_WIDGETS_DIR)/src

DEVCARIB_WIDGETS_SRC_FILES:=$(shell $(FIND) $(DEVCARIB_WIDGETS_SRC_DIR)\
                         -name \*.ts -o -name \*.json -o -name \*.wml)

DEVCARIB_WIDGETS_LIB_DIR:=$(DEVCARIB_WIDGETS_DIR)/lib

DEVCARIB_WIDGETS_LESS_FILES:=$(shell $(FIND) $(DEVCARIB_WIDGETS_SRC_DIR) -name \*.less)
DEVCARIB_WIDGETS_LESS_IMPORTS_FILE:=$(DEVCARIB_WIDGETS_DIR)/imports.less
CLEAN_TARGETS:=$(CLEAN_TARGETS) $(DEVCARIB_WIDGETS_LIB_DIR)
