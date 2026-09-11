# Shared core plan — deferred

Ownership: ExtraPotions / expDARE. Core extraction is deferred; ADPB remains standalone.

## First implementation: ADPB

Keep the Amazon userscript standalone. Its temporary reveal control restores
elements hidden by ADPB, dims them, and restores full contrast on hover or focus.
Ending inspection hides them again without changing preferences or incrementing
statistics again. New matches participate while inspection is active. Reloading
ends inspection. Clicks, checkbox changes and text replacements are not undone.

## Next steps within ADPB

- Assign stable rule IDs and human-readable reasons to every reversible hide.
- Track original element properties separately from rules and settings.
- Explain individual matches and offer explicit, narrowly scoped exceptions.
- Cover nested matches, detached/reinserted elements and site-driven style changes.

## Extract only after a second site validates the boundaries

Shared core: settings schema and migrations, reversible effect tracking,
inspection, exceptions, session counters, menu layout and accessibility.

Site adapter: URL/page detection, selectors, stable rule metadata, defaults,
protected regions and site-specific non-reversible actions.

Rules should provide site ID, rule ID, category, reason and effect type. Record
effects per element, including original value and priority, and support multiple
matching rules without restoring an element still blocked by another rule.
Keep inspection state session-only; persist exceptions separately from toggles.

Do not introduce a runtime download or shared hosted dependency. Bundle the core
into each userscript at build time. Use adapter fixtures to test restoration,
inspection, settings migration and exclusions before adding another site.
