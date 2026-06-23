# Preset Comparison Preview

Preset selection should help creators compare polished episode directions before they commit to a design path.

## User Goal

A creator should be able to preview multiple presets against the same real episode moment and choose the one that best fits the show.

## Relationship To Preset Selection

Comparison preview should extend the preset workflow already defined in `docs/preset-style-picker.md` instead of becoming a detached browse mode.

- launch comparison from preset cards or the first full-episode preview
- use the creator's current episode speakers, social-context names, and brand kit where available
- keep the same creator-facing controls for layout density, caption presence, visual moments, and branding strength
- return the chosen preset to `docs/preset-style-picker.md` Apply And Preview so the creator can commit it to the episode immediately

Comparison should help the creator choose between strong directions, not restart setup from scratch.

## Comparison Approach

Comparison preview is taste first: creators judge pacing, branding strength, and layout feel on the same real moment, then commit one preset to the full episode without re-running setup.

## Comparison Mode

Comparison should support:

- two to four presets side by side
- the same timestamp across all previews
- current speaker names and roles
- current brand kit where available
- caption and lower-third examples
- b-roll or title moment examples when relevant

The product should not compare presets with generic placeholder content once real episode media exists.

## Decision Signals

Each preset should communicate:

- best-fit show format
- pacing feel
- speaker count support
- caption style
- branding strength
- b-roll intensity
- template reuse fit

This should help creators make a taste decision quickly without opening a blank canvas.

## Review States

The product should use comparison status to drive preset selection:

- **previewing** — two or more presets are visible on the same moment without changing the committed episode yet
- **leading choice** — one preset clearly fits the show format and the creator is close to applying it
- **needs another moment** — the current timestamp is not representative and the creator should switch preview moments
- **applied** — the chosen preset returns to full-episode preview through `docs/preset-style-picker.md`
- **saved as template** — the preset plus adjustments are stored through `docs/show-template-adaptation.md`

Each state should describe what happens in preset selection, full-episode preview, and template reuse—not only the label on the card.

## Preview Controls

Creators should be able to:

- switch the preview moment
- compare calm and energetic pacing
- toggle brand kit preview
- inspect mobile or wide layout framing
- apply a preset to the full episode
- save a preset plus adjustments as a template

## Decision Handoff

Once a creator chooses a direction in comparison preview, the product should keep the decision actionable:

- carry the selected preset back to the full-episode preview
- preserve the creator's current control choices unless the creator changes them
- keep template-save behavior aligned with `docs/show-template-adaptation.md` Template Contents, Adaptation Flow
- avoid requiring the creator to re-pick the same preset after leaving comparison

## Maintainer Acceptance Notes

Accept work that makes preset choice visual, comparative, and grounded in the current episode. Close work that turns preset selection into a settings table or uses generic mock previews after episode media is available.
