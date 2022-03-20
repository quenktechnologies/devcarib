# Dagen Template MongoDB Fields

## About

A dagen template for generating MongoDB projection fields.

## Usage

This module is meant to be used as part of the main application build process by 
including the `build.mk` and `variables.mk` files in the main Makefile.

Expected global variables are described in the `variables.mk` file. Before using
the generated module, ensure all the dependencies in `package.json` are 
installed. The dependencies are "x"'d out to avoid nesting dependencies
accidentally.

They should be installed to the main project's package.json.

## License

[Apache 2.0](LICENSE.md)

© 2022 Quenk Technologies