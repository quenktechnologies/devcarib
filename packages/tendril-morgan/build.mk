### Build the tendril-morgan package. ###

### Settings ###
TENDRIL_MORGAN_DIR:=$(PROJECT_PACKAGES_DIR)/tendril-morgan
TENDRIL_MORGAN_SRC_DIR:=$(TENDRIL_MORGAN_DIR)/src
TENDRIL_MORGAN_SRC_DIR_FILES:=$(shell find $(TENDRIL_MORGAN_SRC_DIR) -type f)

### Graph ###

# Copy all the sources to the lib folder then run tsc.
$(TENDRIL_MORGAN_BUILD): $(TENDRIL_MORGAN_SRC_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(TENDRIL_MORGAN_SRC_DIR)/* $@
	$(TSC) --project $@
	$(TOUCH) $@

$(TENDRIL_MORGAN_SRC_DIR): $(TENDRIL_MORGAN_SRC_DIR_FILES)
	$(TOUCH) $@
