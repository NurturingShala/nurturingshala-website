# Website improvement review

Reviewed 14 November 2026 against the current local checkout, including existing uncommitted work. Website source files were not changed.

## Method

Ran `DISABLE_TELEMETRY=1 npx --yes modern-web-guidance@1.0.0 legacy-scan . --json`. Reviewed every match against its supplied keep/drop rubric. Retrieved the secure-external-subresources guide. No persistent agent skill installation was needed for this audit.

Also inspected homepage navigation, contact form, slideshow and lightbox source. Checked the homepage in local Chrome at 390 × 844 with reduced motion enabled. External requests were blocked to isolate local functionality; this was not a production performance, third-party integration, payment or full accessibility test.

## Priorities

1. **Keyboard-accessible mobile navigation.** `index.html` uses a div for `.mobile-menu`; Chrome confirms tabIndex -1 and no aria-expanded. Use a native button with an accessible name, aria-expanded and aria-controls, synchronised with menu state. Ensure Escape closes it and focus styling is visible. This directly improves access to the site's navigation.
2. **Persistent contact field labels.** The name, email, phone and message fields in `index.html` have placeholders but no associated labels. Chrome confirms zero labels on each. Add visible labels, matching IDs and suitable autocomplete attributes.
3. **Accessible photo viewer and slideshow controls.** `js/slideshow.js` opens a custom div overlay through pointer clicks. Its close control is a span; there is no Escape handler, focus management or alt-text copying. Prefer a native dialog opened with showModal(), a real close button, and accessible photo-opening buttons. Add a pause control for the automatic four-second slideshow and respect reduced motion. A native dialog handles modal focus and Escape; verify return focus and keyboard interaction.
4. **Reduced motion on the homepage.** CSS keeps smooth scrolling enabled under reduced-motion preference (confirmed in Chrome), JavaScript forces smooth anchor scrolling, and the slideshow rotates automatically. Use a reduced-motion media query and matchMedia checks, with an explicit pause control.
5. **Photo delivery.** Several workshop JPEGs are 2.4–4.8 MB and the festival hero PNG is 2.8 MB. Produce smaller responsive image variants, specify intrinsic dimensions, and lazy-load below-fold images and the introduction video. Retain priority loading for the leading visible image. Measure production loading before assigning any performance score.
6. **Pinned third-party CSS integrity.** Font Awesome 6.4.0 from cdnjs lacks integrity metadata in `index.html` and `social-content-builder.html`. Add a published or verified build-time digest and anonymous CORS, or self-host the asset. Never invent a hash.

## Scanner findings: 12 total, reviewed in context

- Two simulated underline matches in `css/retreat.css`: low-priority improvements using established text-decoration properties are reasonable, but these rules may deliberately underline the full navigation/link box. Check wrapping before changing. The CLI gates the broader custom-text-decorations guide because it includes volatile text-decoration-skip-spaces. No volatile feature was enabled, and none is required for this site.
- Three vendor-scrollbar matches in `social-content-builder.html`: one shared styling issue in the content builder, not three independent public homepage defects. Standard scrollbar-color/scrollbar-width could improve cross-browser consistency.
- Five filter-chain matches: these recolour existing PNG brand logos, rather than typical UI icons. Review with brand asset context; keep unless a proper single-colour SVG or other equivalent asset is available. Replacing the logo with a decorative mask must not lose its accessible name. These are not urgent.
- Two missing integrity matches for Font Awesome: actionable, described above.

The scanner covers a selected catalogue of legacy patterns. A clean scan would not certify accessibility or speed.

## Positive findings

The retreat page already uses a skip link, visible focus styling, native details/summary disclosure, reduced-motion CSS, image dimensions and lazy loading in several sections. The site is built with lightweight static HTML/CSS/JavaScript. The tested homepage had no horizontal overflow at phone width and no JavaScript page errors during the bounded local check.

## Sources

- https://github.com/GoogleChrome/modern-web-guidance
- https://developer.chrome.com/docs/modern-web-guidance/modernization-workflow
- Raw scan: modern-web-scan-2026-11-14.json

Recommended first implementation: navigation button and state, form labels, reduced-motion support, slideshow controls and native-dialog photo viewer. Then optimise photo delivery and add resource integrity. Preserve existing content and design.

## Implementation completed

All 12 original scanner matches have been addressed. The follow-up scan reports zero findings. Standard text-decoration properties now draw link underlines; standard scrollbar styling is paired with a guarded legacy fallback; SVG assets use an alpha mask of the original logo with explicit brand colours instead of filter chains. Image alternative text is retained, and the social builder embeds the coloured SVGs so its preview and PNG export use identical sources. Original PNG artwork is retained.

Font Awesome integrity metadata was copied from cdnjs's published version 6.4.0 SRI API response. The follow-up scan exposed one additional missing integrity attribute for html2canvas 1.4.1; its published cdnjs SRI was added too. Both resources use anonymous CORS and no-referrer.

Validation: homepage, retreat page and content builder loaded in Chrome without JavaScript page errors; logo decoding succeeded; the builder exported a canvas successfully. Dark, sage and light logo variants were checked through the export path. Homepage and retreat page were checked at 390px without horizontal overflow. Desktop screenshots were visually reviewed. These changes do not resolve the separate navigation, form and animation recommendations above. Nothing was deployed.

Guides consulted: icons, customize-scrollbar-color-and-thickness, secure-external-subresources. Used established text-decoration properties without opting into volatile features.

Follow-up scan: modern-web-scan-after-2026-11-14.json
