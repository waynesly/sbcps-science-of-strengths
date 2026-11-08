# Science of Strengths – Implementation Status

Last audited: 7 November 2026 (AWST)

## Baseline audit

- Platform: Hatchable, static vanilla JavaScript frontend with serverless JavaScript API routes and PostgreSQL.
- Live project: `Science of Strengths – Year 5` (`proj_uXR28QlfssiI`), currently version 10.
- Existing persistence: `submissions`, `teacher_sessions`, and `teacher_login_attempts` tables.
- Authoritative assessment source verified: `Science of Strengths Year 5 Leadership Day.xlsx` (Survey and Scoring sheets).
- Branding source verified: `Branding Guidelines St Bernadette's.pdf`, including approved crest variants, colours, fonts and school values.
- Recoverability: Hatchable deployment history is retained. No production rows have been reset or deleted.

## Completed functionality

- 96 questions and a five-point response scale are present.
- Teacher session cookie is HTTP-only, secure and same-site strict; teacher login has an IP-based retry limit.
- Teacher dashboard remains protected and existing submission/export paths are retained.
- Workbook review established that each strength comprises four questions (score range 4–20).
- Workbook review identified questions 12, 19, 28 and 50 as reverse-scored Forgiveness items.
- Deployed version 5 corrects the reverse-scoring calculation for new submissions and recalculates teacher-dashboard views from saved raw responses without changing historical records.
- Deployed version 6 replaces the visible student, assessment, result and teacher-screen theme with the Science of Strengths Leadership Adventure identity (navy, teal, sky and gold), and introduces the five-stage journey and St Bernadette's welcome treatment.
- Phase 1 is complete: an owner-only executable scoring regression suite was deployed. It operates only on deterministic in-memory fixtures and cannot read or change student records.
- Phase 2 is complete: versioned assessment metadata, server-side resumable draft storage, and private reflection storage were added through an additive migration. The student questionnaire now creates an opaque resume token and autosaves responses.
- Phase 3 is complete: personalised leadership challenges and a private reflection-journal interface are available on completed student profiles. Completed profiles retain token-scoped results so students can return to practise and reflect without retaking the assessment.
- Phase 4 is complete: the teacher dashboard now includes virtue-level cohort insight and a teacher-reviewed balanced team builder. Teacher reports include only reflections students explicitly selected for reporting.

## Defects / implementation work in progress

- **Scoring follow-up:** corrected scores are calculated for new submissions and dashboard reads. Historical `scores` JSON is intentionally retained unchanged; a later reviewed migration may add calculation metadata, but must not overwrite raw responses or records.
- Student resume/autosave, progress persistence, virtue-grouped profile, interactive strength details, leadership challenge library and private reflection journal are not yet implemented.
- Existing print view is not the specified eight-page A4 personalised report.
- Teacher dashboard currently has basic cohort counts and exports, not the requested team builder and full cohort analytics.
- The current visual system uses an earlier purple theme and is not yet the requested Science of Strengths adventure identity.

## Test results

- Workbook mapping audit: 96 questions across 24 strengths, four questions per strength — passed.
- Workbook reverse-scoring audit: 4 Forgiveness items (12, 19, 28, 50) — confirmed.
- Existing teacher authentication logs: successful and unsuccessful access paths observed; historical configuration/runtime errors were also recorded and require regression coverage.
- Production data: not modified during audit.
- Hatchable deploy pre-flight: passed with zero errors and warnings; version 5 deployed successfully.
- Endpoint checks: invalid public submission correctly returns 400; unauthenticated teacher dashboard correctly returns 401.
- Scoring regression suite: 9 of 9 cases passed under admin access; anonymous access was rejected at the platform edge (401), confirming the test route is not public.
- Migration verification: `assessment_progress`, `student_reflections`, and nullable `submissions.assessment_version` are present. Invalid progress and missing-token reflection requests were rejected (400); no student record was created during validation.
- Completion persistence verification: the completed-result fields are present on `assessment_progress`; missing-token progress and reflection requests are rejected (400).
- Teacher authorisation regression: unauthenticated dashboard access remains rejected (401) after the analytics and reporting changes.

## Phase 5 — Artwork library foundations (published)

- Created and approved two original, reusable visual assets: the Leadership Adventure welcome illustration and the six-character canonical reference sheet.
- Added `public/assets/asset-manifest.json`, which records asset purpose, source, status and the outstanding art backlog.
- Produced an optimized welcome-page delivery asset for the hosted application; integration is pending the binary asset upload.
- Published the artwork manifest with the application in Hatchable deployment v11.

## Remaining artwork

The foundation artwork is complete, but the wider illustrated library is still outstanding: 6 virtue cards, 24 strength icons, 5 journey scenes, 8 challenge scenes, 4 teacher-report visuals and 3 completion visuals (50 assets). These are intentionally recorded as planned in the asset manifest rather than treated as completed placeholders.

- Welcome illustration: 1
- Canonical student-adventurer references: 6
- Virtue illustrations: 6
- Individual-strength illustrations: 24
- Journey illustrations: 5
- Leadership-challenge scenes: 8
- Report artwork: 4
- Completion artwork: 3

Required total: 57 assets. The supplied school logo and crest files are available; they must be reused unchanged, not regenerated.

## Next safe phases

1. Build and validate the required artwork library and manifest before releasing the redesigned screens.

## Artwork release candidate — 8 November 2026 (not production)

- Hatchable project was audited at v95. The teacher set-up page referenced `assets/generated/teacher-setup-planning-photo.jpg`, which returned 404 in the deployed site; the release-candidate draft removes the image block rather than replacing it with an untracked file.
- Year 5 challenge delivery now has stable IDs and artwork mappings in the Hatchable draft. `invite-every-voice` maps to the inclusion scene and `keep-going-together` maps to the perseverance scene, independent of recommendation order.
- Classroom Check-in source already maps its six domains and three windows by ID and uses `self-regulation-v2` and `mid-year-v2`. `artwork-implementation.json` records the canonical delivery mappings, including deliberately distinct Year 5 strength and Classroom domain self-regulation IDs.
- The old 50-item artwork backlog is obsolete: delivery files exist in the asset library. The remaining publication task is to reconcile the approved, untracked image masters and the expanded manifest in a reviewed asset commit before deployment.
- `node scripts/validate-artwork.mjs` validates mapped delivery files, stable map cardinality and required current variants. It must be run alongside Hatchable's deploy preflight because Hatchable-only HTML, CSS, JavaScript and print templates are not checked out in this Git repository.
