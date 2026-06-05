# Donation thermometer

An embeddable donation progress widget built with React + Tailwind and bundled
by [Parcel](https://parceljs.org/).

The widget mounts into a [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
and its compiled CSS is injected into that shadow root (not the host page), so
its styles are fully scoped — they can't leak onto the host site, and the host
site's styles can't leak into the widget.

### `pnpm dev`

Runs the app in development mode.
Open [http://localhost:1234](http://localhost:1234) to view it in the browser.
The page reloads as you make edits.

### `pnpm build:parcel`

Builds the app using Parcel. The output is a single self-contained
`dist/index.js` (the CSS is inlined into the bundle).

## Usage

After building, copy `dist/index.js` into the
[static-s3](https://github.com/dxe/static-s3/tree/master/donation-thermometer) repo for hosting.

Then you can embed it on any website like this:

```html
<div class="dxe-donation-thermometer" data-start-date="2022-09-21" data-goal="25000"></div>
<script src="https://dxe-static.s3.amazonaws.com/donation-thermometer/index.js"></script>
```

The `<div>` is configured with data attributes:

| Attribute         | Required | Description                                                                      |
| ----------------- | -------- | -------------------------------------------------------------------------------- |
| `data-start-date` | yes      | Count donations from this date (`YYYY-MM-DD`).                                   |
| `data-goal`       | no       | Fundraising goal. If `0` or omitted, the next goal is calculated from the total. |
| `data-offset`     | no       | Amount subtracted from the raised total (e.g. to exclude offline gifts).         |
| `data-form-id`    | no       | Only count donations to this form. If omitted, all forms are totaled.            |

> No separate stylesheet is needed anymore — the styling ships inside the
> script. If you have an older embed, remove the
> `<link ... donation-thermometer/index.css>` tag (it loaded global styles that
> leaked onto the host page).

## Styling

The widget lives in a Shadow DOM, so ordinary host CSS selectors can't reach
inside it. It exposes a small styling API instead.

```css
.dxe-donation-thermometer {
	/* Inherited properties cross the shadow boundary automatically: */
	font-family: "Inter", sans-serif;
	color: #222;

	/* Custom property for the progress-bar fill color: */
	--dxe-thermometer-bar-color: #e4002b;
}

/* `::part()` gives full CSS control of the exposed elements: */
.dxe-donation-thermometer::part(card) {
	box-shadow: none;
	border-radius: 0;
}
.dxe-donation-thermometer::part(track) {
	background: #f0f0f0;
}
.dxe-donation-thermometer::part(bar) {
	background: linear-gradient(90deg, #e4002b, #ff7a00);
}
```

| Hook                          | Affects                                              |
| ----------------------------- | ---------------------------------------------------- |
| `font-family`, `color`, …     | Inherited by the whole widget from the host element. |
| `--dxe-thermometer-bar-color` | Progress-bar fill color.                             |
| `::part(card)`                | The outer card container.                            |
| `::part(track)`               | The progress bar's background track.                 |
| `::part(bar)`                 | The progress bar's fill (overrides the bar color).   |

### Example

A red progress bar in a flat, square-cornered card:

```html
<style>
	/* Red bar fill */
	.dxe-donation-thermometer {
		--dxe-thermometer-bar-color: #e4002b;
	}
	/* Flat card: no shadow, square corners */
	.dxe-donation-thermometer::part(card) {
		box-shadow: none;
		border-radius: 0;
	}
</style>

<div class="dxe-donation-thermometer" data-start-date="2022-09-21" data-goal="25000"></div>
<script src="https://dxe-static.s3.amazonaws.com/donation-thermometer/index.js"></script>
```
