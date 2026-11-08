# SBCPS Science of Strengths

Year 5 Leadership Adventure artwork library and implementation record for St Bernadette's Catholic Primary School.

The reusable image assets are organised under `public/assets/` by their application role.

## Release validation

Run `node scripts/validate-artwork.mjs` from the repository root before publishing an artwork change. It verifies the stable Year 5 challenge, Classroom Check-in domain/window and print-template mappings, required v2 variants, and delivery-file existence. Update `artwork-implementation.json` whenever an approved delivery asset is replaced; retain source masters outside `public/` and only retire a delivery file after checking Hatchable HTML, CSS, JavaScript and print templates.
