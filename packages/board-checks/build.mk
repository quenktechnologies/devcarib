### Build the build-CHECKS package. ###

### Settings ###
TSC?=./node_modules/.bin/tsc
BOARD_CHECKS_DIR:=$(PROJECT_PACKAGES_DIR)/board-checks
BOARD_CHECKS_SRC_DIR:=$(BOARD_CHECKS_DIR)/src
BOARD_CHECKS_SRC_DIR_FILES:=$(shell find $(BOARD_CHECKS_SRC_DIR) -type f) 

### Graph ###

# Copy all the sources to the lib folder then run tsc.
$(BOARD_CHECKS_BUILD): $(BOARD_CHECKS_SRC_DIR)\
                       $(BOARD_TYPES_BUILD)\
                       $(BOARD_VALIDATION_BUILD)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_CHECKS_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@

$(BOARD_CHECKS_SRC_DIR): $(BOARD_CHECKS_SRC_DIR_FILES)
	touch $@
