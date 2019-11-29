### Build the build-VALIDATION package. ###

### Settings ###
TSC?=./node_modules/.bin/tsc
BOARD_VALIDATION_DIR:=$(PROJECT_PACKAGES_DIR)/board-validation
BOARD_VALIDATION_SRC_DIR:=$(BOARD_VALIDATION_DIR)/src
BOARD_VALIDATION_SRC_DIR_FILES:=$(shell find $(BOARD_VALIDATION_SRC_DIR) -type f) 

### Graph ###

# Copy all the sources to the lib folder then run tsc.
$(BOARD_VALIDATION_BUILD): $(BOARD_VALIDATION_SRC_DIR) $(BOARD_TYPES_BUILD)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_VALIDATION_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@

$(BOARD_VALIDATION_SRC_DIR): $(BOARD_VALIDATION_SRC_DIR_FILES)
	touch $@
