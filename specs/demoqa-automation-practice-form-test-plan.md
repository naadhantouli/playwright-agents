# Test Plan: DemoQA — Automation Practice Form

**Application under test:** [Student Registration Form](https://demoqa.com/automation-practice-form)  
**Environment:** Production demo site (demoqa.com)  
**Assumption:** Each scenario starts from a **fresh page load** with no prior form data, cookies cleared only if a scenario explicitly requires it. Scenarios are **independent** and may be executed in any order unless noted.

---

## Document control

| Item | Value |
|------|--------|
| Scope | Functional UI, client-visible validation, primary user journeys |
| Out of scope | Backend persistence verification, email delivery, exact calendar widget internals |
| Browsers (recommended) | Chromium, Firefox, WebKit (match `playwright.config.ts` projects) |

---

## User journeys (summary)

1. **Prospective student** completes the form with valid data and submits successfully.
2. **User** corrects validation errors after intentional invalid input.
3. **User** explores optional fields (hobbies, picture, address) with minimal required data.
4. **User** uses dependent **State → City** selections and submits.

---

## Scenario 1: Happy path — full valid registration

**Goal:** Submit the form with all fields filled according to documented rules.

**Starting state:** Blank form after navigating to the practice form URL.

**Steps:**

1. Open `https://demoqa.com/automation-practice-form`.
2. Enter **First name** and **Last name** with alphanumeric values (e.g. `John`, `Doe`).
3. Enter a valid **Email** (format `local@domain.tld`).
4. Select **Gender** (e.g. Male).
5. Enter **Mobile** with exactly **10 digits** (numeric only).
6. Set **Date of birth** using the date picker (any valid past date acceptable for the demo).
7. Add at least one **Subject** via the subjects control (type and select from suggestions).
8. Select one or more **Hobbies** (e.g. Sports).
9. **Upload a picture** using a small valid image file (e.g. PNG or JPG under typical size limits).
10. Enter **Current address** (multi-line text allowed if the field supports it).
11. Open **State** dropdown, choose a state.
12. Open **City** dropdown, choose a city available for that state.
13. Click **Submit**.

**Expected outcomes:**

- No blocking client-side errors for the entered valid data.
- After submit, a confirmation or summary appears (modal or new section) showing submitted values consistent with input.

**Success criteria:** Confirmation visible; key fields (name, email, gender, etc.) reflected in the success presentation.

**Failure conditions:** Submit disabled incorrectly, unexplained validation errors on valid data, or silent failure (no feedback).

---

## Scenario 2: Happy path — minimum valid path (required fields only)

**Goal:** Submit with only what the form treats as mandatory, leaving optional fields empty if allowed.

**Starting state:** Blank form.

**Steps:**

1. Navigate to the practice form.
2. Fill **First name**, **Last name**, **Email**, **Gender**, **Mobile** (10 digits), **Date of birth** as in Scenario 1.
3. Leave **Subjects**, **Hobbies**, **Picture**, and **Address** empty **if** the UI allows submit without them.
4. Select **State** and **City** if required for submit; otherwise skip if optional.
5. Click **Submit**.

**Expected outcomes:**

- Either successful submission with confirmation, or clear indication which remaining fields are required.

**Success criteria:** Behavior matches site rules: either success or explicit, field-level required indicators.

**Failure conditions:** Vague error with no field association, or success without required data.

---

## Scenario 3: Email validation — invalid and boundary formats

**Goal:** Verify email field rejects invalid input and accepts standard valid formats.

**Starting state:** Blank form.

**Steps:**

1. Load the form.
2. Enter invalid emails one attempt at a time (refresh or clear between attempts if needed for independence): missing `@`, missing domain, spaces only, `a@b` (single-char domain), and a **valid** email.
3. Observe inline or submit-time validation.
4. For the valid email, complete other **minimal required** fields and submit.

**Expected outcomes:**

- Invalid formats show errors or prevent successful submit until corrected.
- Valid email allows progression consistent with other field rules.

**Success criteria:** Clear feedback for invalid email; valid email accepted when other fields satisfy rules.

**Failure conditions:** Invalid email accepted as valid, or valid email permanently blocked.

---

## Scenario 4: Mobile number — length and character rules

**Goal:** Enforce 10-digit mobile rule.

**Starting state:** Blank form.

**Steps:**

1. Enter fewer than 10 digits in **Mobile**; attempt to submit or tab to next field.
2. Enter more than 10 digits if the field allows typing past 10.
3. Enter letters or symbols if the field allows.
4. Enter exactly **10 numeric digits** and complete remaining required fields; submit.

**Expected outcomes:**

- Short, long, or non-numeric values yield validation errors or are blocked.
- Exactly 10 digits satisfies the mobile rule when other fields are valid.

**Success criteria:** Error messaging or prevention for invalid lengths/types; success path works with 10 digits.

**Failure conditions:** Non-numeric mobile accepted, or 10-digit valid number rejected.

---

## Scenario 5: Gender selection — required radio behavior

**Goal:** Ensure a gender option is selected when required.

**Starting state:** Blank form.

**Steps:**

1. Fill all other required fields **except** Gender.
2. Attempt **Submit**.
3. Select **Gender** (Male, Female, or Other).
4. Submit again with all other requirements met.

**Expected outcomes:**

- First submit fails or highlights Gender as required.
- After selection, form can complete successfully.

**Success criteria:** Required radio behavior is enforced and recoverable.

**Failure conditions:** Submit succeeds without gender, or gender cannot be selected.

---

## Scenario 6: Date of birth — required and plausible date entry

**Goal:** Date picker accepts a valid date and rejects or flags empty DOB.

**Starting state:** Blank form.

**Steps:**

1. Leave **Date of birth** empty; fill other required fields; attempt submit.
2. Clear the form or reload; open the date control and select a valid past date.
3. Complete form and submit.

**Expected outcomes:**

- Empty DOB triggers required validation or blocks submit.
- Selected valid date contributes to successful submission.

**Success criteria:** DOB requiredness is clear; valid selection works end-to-end.

**Failure conditions:** Submit with empty DOB, or valid date not reflected on submit.

---

## Scenario 7: Subjects — autocomplete selection

**Goal:** Add subject(s) via typeahead/autocomplete.

**Starting state:** Blank form.

**Steps:**

1. Focus **Subjects**, type a partial subject name from known demo suggestions.
2. Select an item from the dropdown.
3. Remove focus; verify subject chip or value remains visible.
4. Optionally add a second subject if supported.
5. Complete required fields and submit.

**Expected outcomes:**

- Suggestions appear while typing; selected subjects display and persist until submit.
- Confirmation includes subject information when full flow succeeds.

**Success criteria:** Autocomplete usable without console errors; selected subjects appear in success data if the demo shows them.

**Failure conditions:** Dropdown never appears, selection clears unexpectedly, or duplicate broken behavior with no workaround.

---

## Scenario 8: Hobbies — optional multi-select

**Goal:** Toggle hobby checkboxes and verify state on submit.

**Starting state:** Blank form.

**Steps:**

1. Check **Sports**; uncheck; check **Reading** and **Music**.
2. Complete required fields; submit.

**Expected outcomes:**

- Checkboxes reflect checked state visually.
- Success payload or modal reflects chosen hobbies if the demo displays them.

**Success criteria:** Toggling works; final state matches selection at submit time.

**Failure conditions:** Clicks ignored or wrong hobby shown after submit.

---

## Scenario 9: Picture upload — file type and presence

**Goal:** Validate file upload behavior and optional vs required rules.

**Starting state:** Blank form.

**Steps:**

1. If the site allows, try submit without a picture (other fields valid).
2. Upload a valid small **JPG**; verify filename or preview appears if shown.
3. If possible, attempt an unsupported type (e.g. `.txt` renamed) and observe behavior.
4. Upload valid image again; complete form; submit.

**Expected outcomes:**

- Site clearly states whether picture is optional or required.
- Valid image uploads without breaking submit; invalid type shows error or is rejected.

**Success criteria:** No silent corruption of other fields; user gets feedback on bad files.

**Failure conditions:** Corrupt upload crashes form, or invalid file accepted as image.

---

## Scenario 10: State and City — dependent dropdowns

**Goal:** City options depend on State; both required for valid submit if the form enforces it.

**Starting state:** Blank form.

**Steps:**

1. Open **State**; select a state (e.g. first option).
2. Open **City**; verify options match the chosen state.
3. Change **State** to another value; verify **City** resets or updates appropriately.
4. Select a valid city; complete other fields; submit.

**Expected outcomes:**

- City list is consistent with State.
- Changing State updates City choices or clears invalid prior City.

**Success criteria:** No orphan city from wrong state at submit; successful end-to-end submit.

**Failure conditions:** City shows options for wrong state, or submit accepts inconsistent pair.

---

## Scenario 11: Current address — long text and special characters

**Goal:** Address field accepts reasonable input without breaking submit.

**Starting state:** Blank form.

**Steps:**

1. Enter a short address; submit with other required fields (if address optional, still test visibility in success).
2. Reload; enter a long address (200+ characters) with newline if supported.
3. Enter address with allowed punctuation (`#`, `-`, `,`).
4. Submit successful path.

**Expected outcomes:**

- Text displays fully or scrolls within the field.
- Success view shows address as entered or truncated with consistent rules.

**Success criteria:** No truncation without display; no 500 or blank success for normal long text.

**Failure conditions:** Special characters stripped incorrectly, or XSS-like issues in demo (report security separately if found).

---

## Scenario 12: Submit — double-click and loading state

**Goal:** Submit is idempotent from user perspective (no duplicate modals or duplicate side effects on rapid clicks).

**Starting state:** Form completely valid.

**Steps:**

1. Fill all required fields with valid data.
2. Click **Submit** twice quickly (or click during processing if a spinner appears).

**Expected outcomes:**

- Single clear confirmation path; optional brief loading state.
- No duplicated confirmation modals stacking irrecoverably.

**Success criteria:** One success flow; user can dismiss or proceed without broken UI.

**Failure conditions:** Duplicate records in UI, or stuck loading with no recovery.

---

## Scenario 13: Keyboard and accessibility — core path

**Goal:** Critical fields reachable and operable without mouse.

**Starting state:** Blank form.

**Steps:**

1. Tab through fields in order; verify focus visibility.
2. Use **Space**/**Enter** on Gender radios and Hobbies checkboxes.
3. Open **State**/**City** with keyboard if supported (Arrow keys, Enter).
4. Submit focused **Submit** button via keyboard.

**Expected outcomes:**

- Focus order logical; interactive components follow expected keyboard patterns.

**Success criteria:** Full minimum path completable with keyboard only (allowing known limitations of custom widgets).

**Failure conditions:** Focus trap, invisible focus, or submit unreachable by keyboard.

---

## Scenario 14: Negative — empty form submit

**Goal:** Empty form must not silently succeed.

**Starting state:** Blank form after load; clear any defaults if present.

**Steps:**

1. Load page.
2. Click **Submit** without entering data.

**Expected outcomes:**

- Multiple validation messages or field highlights; no success confirmation.

**Success criteria:** User sees **which** areas need input (not a generic error only, if the UI supports field-level hints).

**Failure conditions:** Success modal with empty data.

---

## Scenario 15: Resilience — refresh mid-edit

**Goal:** Refreshing loses in-progress data (expected for traditional multi-page form).

**Starting state:** Partially filled form.

**Steps:**

1. Enter several field values.
2. Reload the browser page.
3. Observe field values.

**Expected outcomes:**

- Fields empty after refresh unless the app implements draft storage (not expected on demoqa).

**Success criteria:** Predictable loss of data; no corrupted half-state after reload.

**Failure conditions:** Broken layout after reload or phantom validation state.

---

## Test data quick reference

| Field | Valid example | Invalid / edge examples |
|-------|----------------|-------------------------|
| Email | `student@example.com` | `bad`, `@nodomain.com`, ` spaces ` |
| Mobile | `1234567890` | `123`, `12345678901`, `abc1234567` |
| Picture | Small `.png` / `.jpg` | Empty, `.txt` if rejected |

---

## Exit criteria for QA sign-off

- All **Scenario 1** and **Scenario 2** paths behave consistently with site rules.
- No **P1** failures: unblockable submit, wrong data on confirmation, or crash on main flow.
- Validation scenarios (**3–6, 14**) demonstrate clear user feedback.

---

## Notes for automation (`playwright-test-generator`)

- Stable selectors: prefer `getByRole`, `getByLabel`, and `getByPlaceholder` over brittle CSS.
- Date picker and **State/City** may need `force: true` or scroll-into-view if ads or footers intercept clicks on this demo site.
- Seed reference in repo: `tests/seed.spec.ts` (ensure `page.goto('https://demoqa.com/automation-practice-form')` is used in implementation).
