## About it

This responsive app allows to manage a list of devices. The user can list them, add a new one, edit an existing device or remove it. Also it includes a couple of features to filter and sort the list.

## Install dependencies

Run the command below to install the required dependencies from package.json

### `yarn install`
### or `yarn`


## Run the app

In the project directory, you have to run:
### `yan start`

## Running test

In the project directory, you have to run:
### `yan test`

## Environment variables

You can set the following env variables:

- `DEVICE_API_URL` (if you do not set it, it will take the default value: `http://localhost:3000/devices`)

## Language and libraries

This project was developed in `TypeScript` (https://www.typescriptlang.org/). 

The UI included 2 principal libraries: `Material UI` and `sytled-components` (https://mui.com/ and https://styled-components.com/).
The unit test are built with `@testing-library/react` and `jest`.
