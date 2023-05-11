$(BOARD_WIDGETS_DIR): $(BOARD_WIDGETS_DIR)/lib \
	              $(BOARD_WIDGETS_DIR)/imports.less
	touch $@

$(BOARD_WIDGETS_DIR)/lib: $(shell find $(BOARD_WIDGETS_DIR)/src -name \*.ts \
	                  -o -name \*.json -o -name \*.wml) \
	                  $(BOARD_TYPES_DIR)
	rm -R $@ 2> /dev/null || true
	mkdir $@
	cp -R -u $(BOARD_WIDGETS_DIR)/src/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_WIDGETS_DIR)/imports.less: $(shell find $(BOARD_WIDGETS_DIR)/src \
	                            -name \*.less)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_WIDGETS_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
