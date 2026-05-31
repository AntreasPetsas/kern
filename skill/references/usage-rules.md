# Usage Rules

> Global design principles + per-component do/don't lists.

## Global principles

1. **Tokens-first.** Never hardcode colors, spacing, font-sizes, radius, or shadows. If you find yourself typing a hex code or a px value, stop and find the token.
2. **Semantic over primitive.** Reach for `color.action.primary` before `color.blue.600`. Semantic tokens communicate intent and survive palette changes.
3. **One source of truth.** `tokens/` and `specs/` are the only files you ever hand-edit. Everything in `build/`, `skill/`, and `llm-context/` is generated.
4. **Composition over invention.** Combine existing components and tokens before designing new variants. A new variant should solve a generalizable problem, not a one-off layout.
5. **Accessibility is not optional.** Every interactive component must be keyboard-operable, focus-visible, and screen-reader-friendly. Color alone never communicates state.
6. **Predictable spacing rhythm.** Stick to the spacing scale. Custom values create visual noise.
7. **Hierarchy through scale, not weight.** Use font-size and spacing to establish hierarchy before reaching for bold or color emphasis.

## Composition patterns

- **Card + Button:** Put primary actions inside `CardFooter`, never floating in `CardBody`.
- **Input + Form:** Always pair Input with a visible `<label>`. Use `errorMessage` after submit, not before user interaction.
- **Button groups:** Pair one primary Button with one secondary/ghost for cancel actions. Never two primaries side-by-side.

## Per-component rules

### Button

**Do**
- Use one primary Button per section — it signals the single most important action.
- Label with a verb that describes the outcome: 'Save changes', 'Create project', 'Delete account'.
- Use loading state for async operations lasting more than 300ms.
- Use type='submit' when the button submits a form.
- Pair a primary button with a secondary or ghost for a cancel/back option.

**Don't**
- Don't use a Button for navigation — use a link (<a>) instead.
- Don't stack multiple primary Buttons in the same view.
- Don't use disabled to hide unavailable actions — consider explaining why it's unavailable.
- Don't truncate button labels — if space is tight, shorten the copy, not the element.
- Don't use the ghost variant for the most critical action in a section.

### Card

**Do**
- Use Card to group a coherent set of related information — a product, a person, a task.
- Use CardHeader / CardBody / CardFooter to establish clear information hierarchy within the card.
- Choose the semantic element carefully: use as='article' for self-contained content, as='section' for labelled groupings, as='li' inside a list of cards.
- Use shadow='none' with an explicit border when cards appear on a non-white background.
- Keep Cards focused — if a card's content covers two unrelated topics, split into two cards.

**Don't**
- Don't nest Cards inside Cards — it creates visual ambiguity about hierarchy.
- Don't put interactive elements like links or buttons directly on the card root — put them inside CardFooter or inline in CardBody.
- Don't use Card as a generic wrapper for every UI region — use semantic HTML (section, aside, main) without a card surface when elevation isn't needed.
- Don't use large shadow='lg' cards on light backgrounds for non-critical content — it creates false urgency.
- Don't use padding='none' without providing your own spacing — content touching card edges looks broken.

### Input

**Do**
- Always provide a visible label — use the label prop, not placeholder alone.
- Use helperText to set user expectations before they interact (e.g. 'Must be 8+ characters').
- Use errorMessage after validation, not before — don't show errors before the user has had a chance to fill in the field.
- Use type='email', type='password', etc. for correct mobile keyboard and browser auto-fill.
- Mark required fields with required prop and communicate requirements in the label or helperText.

**Don't**
- Don't use placeholder as a label — it disappears on input and fails contrast requirements.
- Don't show an error before the field has been interacted with.
- Don't rely on color alone to communicate error state — the error message text is essential.
- Don't disable a field to prevent editing when readonly is more appropriate.
- Don't use for multi-line text — use a <textarea> instead.
