import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// ─── Custom / Pro Icon Definitions ───────────────────────────────────────────
// These icons are available in Font Awesome Pro but not in the free tier.
// They are defined here as custom icon objects using the FA SVG format so the
// design system works without a Pro licence.
//
// When Font Awesome Pro packages are installed, swap these imports:
//   import { faPenLine } from '@fortawesome/pro-solid-svg-icons';

/**
 * fa-pen-line  (FA Pro, Unicode f8cf)
 * Pen icon with a horizontal underline — used for "editable cell" affordance.
 * Path = faPen body  +  rounded underline bar at the bottom of the canvas.
 */
export const faPenLine: IconDefinition = {
  prefix: 'fas',
  iconName: 'pen-line',
  icon: [
    512, // width
    512, // height
    [],  // ligatures
    'f8cf', // unicode
    [
      // Pen body (identical to free faPen path)
      'M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z',
      // Horizontal underline bar (rounded, full-width at bottom of canvas)
      'M24 480H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z',
    ],
  ],
};
