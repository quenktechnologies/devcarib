### Build the build-types package. ###

### Settings ###
TSC?=./node_modules/.bin/tsc
BOARD_TYPES_DIR:=$(PACKAGES_DIR)/board-types
BOARD_TYPES_SRC_DIR:=$(BOARD_TYPES_DIR)/src
BOARD_TYPES_SRC_DIR_FILES:=$(shell find $(BOARD_TYPES_SRC_DIR) -type f) 

### Graph ###

# Copy all the sources to the lib folder then run tsc.
$(BOARD_TYPES_BUILD): $(BOARD_TYPES_SRC_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_TYPES_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@

$(BOARD_TYPES_SRC_DIR): $(BOARD_TYPES_SRC_DIR_FILES)
	touch $@
