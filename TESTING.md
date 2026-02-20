- **Rubric:** Open the calendar; it should show the current month.
  - **How tested:** Opened `index.html` in browser and compared displayed month/year against system date.

- **Rubric:** October 2024 layout and event placement are correct.
  - **How tested:** Navigated to October 2024 and checked:
    - 5 rows x 7 columns are rendered.
    - First row shows Tue Oct 1 to Sat Oct 5, with Sep 29/30 either shown or blank.
    - Last row shows Sun Oct 27 to Thu Oct 31, with Nov 1/2 either shown or blank.
    - Oct 8 shows Ada Lovelace Day.
    - Oct 25 shows World Lemur Day.

- **Rubric:** October 2020 event placement is correct.
  - **How tested:** Navigated to October 2020 and verified Oct 13 (Ada Lovelace Day) and Oct 30 (World Lemur Day).

- **Rubric:** May 2030 event placement is correct.
  - **How tested:** Navigated to May 2030 and verified May 11 (International Binturong Day).

- **Rubric:** Month grid boundaries are correct with no extra week padding.
  - **How tested:** Navigated to each month and verified start/end weekday and number of leading/trailing empty cells:
    - 2024-12: Sunday start, Tuesday end, 4 empty after.
    - 2025-02: Saturday start (6 before), Friday end (1 after).
    - 2025-05: Thursday start (4 before), Saturday end (0 after).
    - 2026-02: Sunday start (0 before), Saturday end (0 after).

- **Rubric:** Previous/next buttons function across selector boundaries.
  - **How tested:** Clicked previous/next repeatedly across month/year transitions (including lower/upper selector limits if present) and confirmed calendar remains valid and never shows empty/undefined/null/NaN labels.

- **Rubric:** Usable month+year jump exists.
  - **How tested:** Used month/year selector to jump directly to non-adjacent months and confirmed correct calendar/event rendering after each jump.

- **Rubric:** UI is DOM-generated and day generation is dynamic.
  - **How tested:** Added temporary extra date entries in `days.json`, refreshed page, and confirmed new events appeared without static HTML edits.

- **Rubric:** Accessibility score is 100 in Lighthouse.
  - **How tested:** Ran Lighthouse Accessibility audit in Chrome DevTools on the calendar page and recorded score of 100.

- **Rubric:** At least one non-trivial unit test exists.
  - **How tested:** Unit tests in `common.test.mjs`.

- **Rubric:** iCal generation matches web dates.
  - **How tested:** Ran `node generate-ical.mjs` to produce `days.ics`, imported into Google Calendar, and verified the same key dates as the web UI (October 2024, October 2020, May 2030 checks above).

- **Rubric:** iCal events are whole-day (no start/end time).
  - **How tested:** Inspected imported Google Calendar events from `days.ics` and confirmed they appear as all-day events with no time-of-day fields.

- **Rubric:** Date-calculation logic is shared between web and iCal generators.
  - **How tested:** Reviewed module imports/usage in `web.mjs` and `generate-ical.mjs` and confirmed both rely on shared date logic from common module(s).
