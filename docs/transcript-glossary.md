# Transcript Glossary

A show glossary should make recurring names, brands, and phrases accurate across captions, metadata, title cards, and templates.

## User Goal

A creator should be able to approve important spellings once and have those corrections improve future episodes without editing every caption by hand.

## Glossary Entries

Support entries for:

- host and guest names
- company names
- product names
- sponsor names
- show segments
- recurring jargon
- acronyms
- common misspellings

Entries should include the approved spelling, optional pronunciation note, and where the term should be used.

## Sources

The product can suggest glossary entries from:

- social context
- repeated transcript corrections
- show templates
- episode metadata
- sponsor kits
- creator notes

Suggestions should require creator approval before they become reusable.

## Application

Approved glossary entries should improve:

- captions
- transcript search
- title cards
- chapter titles
- lower-thirds
- descriptions
- thumbnails

The product should show when a correction was applied across repeated instances.

Glossary issues that would affect the chosen export destination should surface in `docs/export-readiness-review.md` Glossary Warnings.

## Review And Manage

A glossary should stay something the creator skims and trusts, not a list they have to police. Each entry should show a clear state:

- approved — confirmed and applied to this and future episodes
- suggested — proposed from a source, waiting for approval
- needs review — conflicting spellings or a low-confidence source
- declined — a suggestion the creator rejected, kept out of future prompts

Keep the controls direct:

- approve a suggested entry in one action
- edit the approved spelling or pronunciation note
- choose where a term applies, such as captions, titles, or descriptions
- merge duplicate entries for the same term
- decline a suggestion so it stops being offered
- undo a correction that was applied across the episode

Approving or editing an entry should preview the change on a real caption line before it spreads to repeated instances, and the creator should always be able to see which moments an entry already changed. New entries should default to the current episode and become reusable for the show only after the creator confirms them.

## Maintainer Acceptance Notes

Accept work that improves transcript and caption accuracy through reusable creator-approved spellings. Close work that silently changes speaker words, stores sensitive inferred details, or separates glossary corrections from visible episode outputs.
