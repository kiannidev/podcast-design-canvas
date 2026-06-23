# Episode Ingest Readiness

The first setup screen should make separate podcast recordings feel organized before any visual design choices happen.

## User Goal

A creator importing Riverside-style synced recordings should be able to confirm every speaker track, fix obvious assignment issues, and continue with confidence that the episode is ready for styling and editing.

## Relationship To Episode Setup

Ingest readiness should summarize work from the episode setup path without turning this screen into a diagnostics console:

- import sources and speaker buckets on this screen
- track health follow-up in `docs/source-media-health.md`
- sync repair follow-up in `docs/speaker-sync-repair.md`
- social links and spellings in `docs/social-context-intake.md`
- speaker roles in `docs/speaker-role-mapping.md`
- preset selection in `docs/preset-style-picker.md`

Issues that remain unfixed at export should surface in `docs/export-readiness-review.md` Source Media Warnings or Speaker Sync Warnings when they would affect the finished episode.

## Import Sources

Support clear source choices without exposing production mechanics:

- paste a Riverside share link
- upload separate synced host and guest video files
- add a missing speaker file before continuing
- replace a mismatched track without restarting the setup

The setup should describe sources in creator language: speaker video, episode audio, transcript, and social links. Avoid asking users to reason about manifests, encoders, timecodes, or pipeline stages.

## Speaker Buckets

Every imported track should resolve into a visible speaker bucket:

- Host
- Guest 1
- Guest 2
- Co-host
- Producer or off-camera voice

Each bucket should show the speaker name when known, a thumbnail or waveform preview, and a short confidence state such as ready, needs name, duplicate audio, or missing video.

## Readiness Checks

Before the user picks a preset style, the product should flag only issues that would affect the finished episode:

- one or more speaker buckets are empty
- two buckets appear to contain the same recording
- a track has audio but no video
- the episode has a major duration mismatch across speaker files
- transcript generation has not started or has failed

Warnings should include the next creator action, not an internal error. For example: "Guest 1 looks 12 minutes shorter than Host. Replace the file or continue with a visible gap."

## Ingest Approach

Ingest is assignment first: creators confirm who each track belongs to and whether the raw media is usable enough to style, then hand off deeper fixes to the spec that owns them. This screen should not become a second place to repair sync, replace files, or approve captions.

## Review States

The product should use ingest status to drive setup confidence and later export readiness:

- **ready** — every required bucket is assigned and no blocking media or sync issue remains for preset selection
- **needs assignment** — a bucket is empty, unnamed, or still carrying a low-confidence role guess
- **needs media fix** — a track health problem should open `docs/source-media-health.md` before styling continues
- **needs sync fix** — a timing or duplicate-track problem should open `docs/speaker-sync-repair.md`
- **needs context** — a speaker still needs a social link or spelling note in `docs/social-context-intake.md`
- **continuing with warning** — the creator chose to proceed with a visible gap, audio-only track, or unresolved issue that may resurface at export

Each state should describe what happens on the setup screen, what the creator can do next, and whether export readiness should stay quiet until styling begins.

## Creator Controls

Keep setup actions direct:

- add or replace a speaker file
- rename a bucket
- accept or change a suggested role
- open sync repair for one track
- mark a track as audio-only after previewing the result
- assign a missing social link
- continue to preset styling when only non-blocking issues remain

Replacing a file or completing sync repair should refresh the bucket state here without making the creator restart ingest.

## Issue Resolution Mapping

Ingest readiness should point creators to where each flagged issue is actually fixed instead of resolving media, sync, or context problems inside the setup screen. This keeps the first screen focused on assignment confidence and avoids turning ingest into a separate diagnostics queue.

Each readiness check maps to the spec that owns the fix:

| Readiness issue | Where the creator fixes it | Relevant section |
| --- | --- | --- |
| empty speaker bucket | `docs/source-media-health.md` | Health Checks, Readiness Summary |
| two buckets share the same recording | `docs/speaker-sync-repair.md` | Detected Issues, Repair Actions |
| track has audio but no video | `docs/source-media-health.md` | Health Checks, Readiness Summary |
| duration mismatch across speaker files | `docs/speaker-sync-repair.md` | Detected Issues, Repair Actions |
| transcript not started or failed | `docs/source-media-health.md` | Health Checks |
| speaker bucket still needs a name or link | `docs/social-context-intake.md` | Accepted Inputs, Review States |

Each warning should hand off to the owning surface with the creator action attached, such as replace the file, align the track, or assign a missing link. Issues that do not affect the visible final episode should not block continuing to preset styling.

## Maintainer Acceptance Notes

Accept work that makes import, upload, sync confidence, and speaker assignment feel obvious before editing starts. Close work that turns ingest into a technical diagnostics page or blocks creators on issues that do not affect the visible final episode.
