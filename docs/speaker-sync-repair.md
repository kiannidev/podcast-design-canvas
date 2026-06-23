# Speaker Sync Repair

Sync repair should help creators fix visible speaker timing problems without exposing them to timeline engineering.

## User Goal

A creator should be able to notice when separate speaker tracks are out of sync, understand the viewer-facing problem, and apply a simple repair before styling or export.

## Relationship To Ingest

Sync repair should start from problems surfaced during ingest or playback review:

- bucket assignment and readiness checks from `docs/episode-ingest-readiness.md`
- source file replacement from `docs/source-media-health.md`
- caption and attribution follow-up in `docs/audio-caption-quality-review.md` when transcript timing no longer matches video
- export resurface in `docs/export-readiness-review.md` Speaker Sync Warnings when timing would ship unresolved

Sync issues that would affect the chosen export destination should surface in `docs/export-readiness-review.md` Speaker Sync Warnings.

## Detected Issues

Flag issues that affect the finished episode:

- speaker video starts late
- speaker audio starts before video
- one track drifts over time
- a guest track ends early
- duplicate audio appears in two tracks
- transcript speaker attribution no longer matches the video

Warnings should describe the visible or audible problem, not internal timing data.

## Sync Approach

Sync repair is moment first: creators preview the mismatch at the conversation point where viewers would notice it, apply a simple repair, then spot-check a few checkpoints rather than scrubbing the full timeline.

## Review States

The product should use sync status to drive repair review and export readiness:

- **aligned** — the track matches host timing within normal conversation tolerance
- **needs repair** — a visible or audible mismatch should open repair actions at the affected moment
- **repaired** — the chosen fix was applied and ingest buckets should refresh to reflect the new state
- **audio-only accepted** — the creator removed or hid video for this track and layouts should adapt
- **ignored for episode** — the creator accepted a visible gap or drift with the publishing consequence shown
- **blocked for export** — duplicate audio, missing ending, or major drift would ship unresolved unless fixed or explicitly ignored

Repaired, audio-only, and ignored outcomes should flow back to `docs/episode-ingest-readiness.md` and `docs/source-media-health.md` so setup and track health stay aligned with the current episode.

## Repair Actions

Use simple actions:

- align to host
- trim leading silence
- add visible gap
- replace track
- mark as audio-only
- ignore for this episode

The product should preview the repair on a real moment before applying it across the episode.

## Review Points

After repair, show a small set of checkpoints:

- episode start
- first guest response
- midpoint
- final speaker exchange
- any detected drift point

Creators should not need to manually scrub the full timeline to trust the repair.

## Maintainer Acceptance Notes

Accept work that makes speaker sync issues understandable and fixable during ingest. Close work that surfaces raw timecode diagnostics, hides sync problems until export, or requires creators to manually align every track.
