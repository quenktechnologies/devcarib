### Build the build-CHECKS package. ###

### Settings ###
TSC?=./node_modules/.bin/tsc
BOARD_CHECKS_LIB_DIR:=$(BOARD_CHECKS_DIR)/lib
BOARD_CHECKS_SRC_DIR:=$(BOARD_CHECKS_DIR)/src
BOARD_CHECKS_SRC_DIR_FILES:=$(shell find $(BOARD_CHECKS_SRC_DIR) -type f) 

### Graph ###
$(BOARD_CHECKS_DIR): $(BOARD_CHECKS_LIB_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(BOARD_CHECKS_LIB_DIR): $(BOARD_CHECKS_SRC_DIR)\
                         $(BOARD_TYPES_DIR)\
                         $(BOARD_VALIDATION_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_CHECKS_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@

$(BOARD_CHECKS_SRC_DIR): $(BOARD_CHECKS_SRC_DIR_FILES)
	touch $@
