# Donation thermometer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `pnpm dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `pnpm build:parcel`

Builds the app using parcel.

## Usage

After building, copy the `dist` files into the
[static-s3](https://github.com/dxe/static-s3/tree/master/donation-thermometer) repo for hosting.

Then you can embed it on any website like this:

```html
<link href="https://dxe-static.s3.amazonaws.com/donation-thermometer/index.css" rel="stylesheet" />
<dxe-donation-thermometer data-start-date="2022-09-21" data-goal="25000" />
<script src="https://dxe-static.s3.amazonaws.com/donation-thermometer/index.js"></script>
```
