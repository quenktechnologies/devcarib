SHELL=/bin/bash -o pipefail
HERE?=$(shell pwd)
ROOT_DIR?=$(HERE)
DEV?=
# EOL marker
define EOL


endef

# These are all the scripts in the node_modules/.bin folder used by the build
# scripts.
# 
# Declaring them all here allows them to be re-used in nested Makefiles without
# having to repeat the entire paths.
TDC?=$(ROOT_DIR)/node_modules/.bin/tdc
TSC?=$(ROOT_DIR)/node_modules/.bin/tsc
BROWSERIFY?=$(ROOT_DIR)/node_modules/.bin/browserify
LESSC?=$(ROOT_DIR)/node_modules/.bin/lessc
JS_VARS:=$(ROOT_DIR)/node_modules/@quenk/wml-widgets/lib/classNames.js
WMLC?=$(ROOT_DIR)/node_modules/.bin/wmlc
ENVIFY?=$(ROOT_DIR)/node_modules/.bin/envify
TSFMT?=$(ROOT_DIR)/node_modules/.bin/tsfmt
TSC?=$(ROOT_DIR)/node_modules/.bin/tsc
DAGEN?=$(ROOT_DIR)/node_modules/.bin/dagen
DAGEN_PLUGIN_IMPORTS?=$(ROOT_DIR)/node_modules/@quenk/dagen-commons/lib/plugins/imports.js
VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/checks
TRANSFORM?=$(ROOT_DIR)/node_modules/.bin/transform
CLEANCSS?=$(ROOT_DIR)/node_modules/.bin/cleancss
UGLIFYJS?=$(ROOT_DIR)/node_modules/.bin/uglifyjs
ESBUILD:=$(ROOT_DIR)/node_modules/.bin/esbuild
SASSC:=$(ROOT_DIR)/node_modules/.bin/sass

# Dagen templates used in most QTL projects.
QTL_DAGEN_TEMPLATES_DIR?=$(ROOT_DIR)/node_modules/@quenk/dagen-templates-quenk
