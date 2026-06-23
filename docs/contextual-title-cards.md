# Contextual Title Cards

Title cards should surface key moments — topic shifts, guest introductions, notable quotes, and segment transitions — as polished visual beats that keep viewers oriented across a long-form episode.

## User Goal

A creator should be able to place, style, and review title cards at meaningful moments so the episode feels structured and easy to follow without manual motion-graphics work.

## Sources

Title card content can come from:

- topic names and talking points from `docs/social-context-intake.md`
- guest names and handles from `docs/guest-profile-reuse.md`
- segment labels from `docs/show-segment-system.md`
- chapter titles from `docs/episode-chapter-markers.md`
- transcript highlights the creator marks as quotable

The product should suggest title card placements but never insert them without creator confirmation.

## Creator Controls

Use simple controls:

- accept, edit, or dismiss a suggested title card
- place a new title card at any moment
- choose a card style from the current preset
- adjust text, position, and duration with named steps
- preview a title card against the real episode moment

Avoid exposing keyframe editors, motion curves, render layers, or compositing tools in the default path.

## Review States

Use simple states:

- ready
- needs review
- overlap with caption or speaker frame

These states should appear in `docs/export-readiness-review.md` Contextual Visual Warnings only when a title card in the export would affect the finished episode.

## Preview Contexts

A title card that reads well in one view can fail in another, so each card should be checked the way a viewer will actually see it before it is approved:

- full-size desktop preview with the active speaker visible
- small mobile preview, to confirm the text stays readable
- the card over live captions, to confirm it does not bury a line viewers need
- the card held on a paused frame, to confirm it reads on its own
- the seconds just before and after, to confirm it does not collide with a neighboring overlay or b-roll moment

Every context should use the real episode frame and the same card, so the creator judges one honest tradeoff instead of approving a card that only works in the editor's main view.

## Template Reuse

Title card styles and placement rules should save with the show template described in `docs/show-template-adaptation.md`, so recurring segments and guest introductions keep a consistent look across episodes.

## Pacing Rules

Title cards should stay calm across a long-form episode, not crowd every moment:

- keep a restrained default count rather than a card at every topic mention
- space cards so a viewer has time to read one before the next appears
- favor cards at real beats — topic shifts, guest introductions, and segment changes
- group repeated suggestions so an hour-plus episode does not surface dozens of equal-priority cards
- preserve confirmed cards and their timing when the episode is re-rendered

Avoid filling quiet stretches with decorative cards just because a moment was detected; the conversation should stay the focus.
