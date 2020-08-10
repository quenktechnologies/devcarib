### Build the csa-session package. ###

### Settings ###
CSA_SESSION_SRC_DIR:=$(CSA_SESSION_DIR)/src
CSA_SESSION_SRC_DIR_FILES:=$(shell find $(CSA_SESSION_SRC_DIR) -type f)

### Graph ###

$(CSA_SESSION_DIR): $(CSA_SESSION_BUILD)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(CSA_SESSION_BUILD): $(CSA_SESSION_SRC_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(CSA_SESSION_SRC_DIR)/* $@
	$(TSC) --project $@
	$(TOUCH) $@

$(CSA_SESSION_SRC_DIR): $(CSA_SESSION_SRC_DIR_FILES)
	$(TOUCH) $@
