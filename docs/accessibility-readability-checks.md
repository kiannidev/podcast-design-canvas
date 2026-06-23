# Accessibility And Readability Checks

Accessibility checks should protect viewer clarity without making creators think like compliance specialists.

## User Goal

A creator should be able to catch captions, contrast, motion, and layout issues that make a podcast episode harder to watch or understand.

## Relationship To Layout Review

Readability review should start from episode context already in the workspace:

- caption style from `docs/audio-caption-quality-review.md`
- safe areas from `docs/layout-safe-areas.md`
- destination crops from `docs/destination-crop-previews.md`
- brand guardrails from `docs/show-brand-kit-setup.md`
- speaker framing from `docs/speaker-framing-safety.md`
- contextual visuals from `docs/contextual-broll-moments.md`

Issues that would affect the chosen export destination should surface in `docs/export-readiness-review.md` Readability Warnings.

## Checks

Flag viewer-facing issues:

- captions have low contrast
- captions are too small
- captions cover speaker faces
- lower-thirds overlap captions
- sponsor marks reduce readability
- title cards move too quickly
- flashing or intense motion appears repeatedly
- important visual information has no text equivalent

Checks should explain the viewing problem and offer a direct fix.

## Readability Approach

Readability review is viewer first: creators judge captions, contrast, and motion at the destination preview size where the problem would appear, not through a separate compliance checklist.

## Review States

The product should use readability status to drive layout review and export readiness:

- **clear** — captions, contrast, and motion read well for the chosen destination
- **flagged** — show the issue on the affected moment and preview size with a direct fix
- **fixed** — apply the chosen readability change and refresh destination previews
- **applied broadly** — carry the same fix to similar moments after the creator confirms the pattern
- **accepted** — keep the current treatment when the creator marks it as intentional and clear the related export warning
- **blocked for export** — low contrast, unreadable text, or harmful motion would ship in the finished episode unless fixed or explicitly ignored

Each state should describe what happens in preview, export warnings, and the next creator action—not only the label on the issue.

## Preview Contexts

Review readability in:

- full-size desktop preview
- small mobile preview
- paused frame
- active speaking moment
- b-roll moment
- title card moment

Different preview contexts should use the same episode content so creators can judge real tradeoffs.

## Creator Controls

Offer simple fixes:

- increase caption size
- move captions
- improve contrast
- reduce motion
- simplify overlay
- use alternate lower-third position
- apply fix across template

## Maintainer Acceptance Notes

Accept work that makes final episodes clearer and more watchable across captions, layouts, and visual moments. Close work that buries creators in formal compliance language or treats readability as unrelated to export quality.
