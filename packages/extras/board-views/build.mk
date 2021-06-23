### Build the board-views package. ###
# Requires:
# 1. BOARD_VIEWS_DIR

### Executables ###
LESSC?=./node_modules/.bin/lessc

### Settings ###
BOARD_VIEWS_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_VIEWS_VIEWS_DIR:=$(BOARD_VIEWS_DIR)/views
BOARD_VIEWS_LIB_DIR:=$(BOARD_VIEWS_DIR)/lib
BOARD_VIEWS_SRC_DIR:=$(BOARD_VIEWS_DIR)/src
BOARD_VIEWS_SRC_DIR_FILES:=$(shell $(FIND) $(BOARD_VIEWS_SRC_DIR) -name \*.wml)
BOARD_VIEWS_LESS_FILES:=$(shell $(FIND) $(BOARD_VIEWS_VIEWS_DIR) -name \*.less)
BOARD_VIEWS_LESS_MAIN:=$(BOARD_VIEWS_DIR)/main.less
BOARD_VIEWS_LESS_IMPORTS:=$(BOARD_VIEWS_DIR)/auto.less
BOARD_VIEWS_PUBLIC_DIR:=$(BOARD_VIEWS_DIR)/public
BOARD_VIEWS_CSS_FILE:=$(BOARD_VIEWS_PUBLIC_DIR)/assets/css/site.css

### Graph ###
$(BOARD_VIEWS_DIR): $(BOARD_VIEWS_LIB_DIR)\
                    $(BOARD_VIEWS_PUBLIC_DIR)\
		    $(BOARD_WIDGETS_DIR)
	touch $@

$(BOARD_VIEWS_LIB_DIR): $(BOARD_VIEWS_SRC_DIR)
	rm -R $@ || true
	cp -R -u $(BOARD_VIEWS_SRC_DIR) $@
	$(WML) $@
	$(TSC) --project $@
	touch $@

$(BOARD_VIEWS_SRC_DIR): $(BOARD_VIEWS_SRC_DIR_FILES)
	touch $@

$(BOARD_VIEWS_PUBLIC_DIR): $(BOARD_VIEWS_CSS_FILE)
	touch $@

$(BOARD_VIEWS_CSS_FILE): $(BOARD_WIDGETS_LESS_IMPORTS_FILE) \
			 $(BOARD_VIEWS_LESS_IMPORTS) \
			 $(BOARD_VIEWS_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_VIEWS_JS_VARS) $(BOARD_VIEWS_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_VIEWS_LESS_IMPORTS): $(BOARD_VIEWS_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_VIEWS_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
