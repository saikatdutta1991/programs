# Backend Folder Structure: Layer-first vs Domain-first

A short guide to how we organize our backend, and why. Meant to settle the recurring "which folder does this go in" question.

---

## The two options

There are two common ways to lay out a backend. The difference is simply **what you group by first.**

### Layer-first (group by technical role)

```
root
  controllers/
    user/  company/  pipeline/
  services/
    user/  company/  pipeline/
  repositories/
    user/  company/  pipeline/
  entities/
    user/  company/  pipeline/
```

### Domain-first (group by business concept) — recommended

```
root
  user/
    user.controller
    user.service
    user.repository
    user.entity
  company/
    company.controller
    company.service
    company.repository
    company.entity
  pipeline/
    pipeline.controller
    pipeline.service
    pipeline.repository
    pipeline.entity
  shared/          # cross-cutting: auth, db config, errors, common DTOs
```

---

## Why we prefer domain-first

**We change features, not layers.** When you add a field to `pipeline` or fix a bug in its flow, you almost always touch its controller, service, repository, and entity *together*. Domain-first keeps all of that in one folder, so the change is local. Layer-first spreads the same change across four top-level directories and you spend the day jumping between them.

| | Layer-first | Domain-first |
|---|---|---|
| A typical change touches... | 4 scattered folders | 1 folder |
| Onboarding ("show me how users work") | hunt across the tree | open `user/` |
| Growth at scale | `services/` becomes a dumping ground | add a self-contained module |
| Ownership by a team | unclear | one team owns one folder |

Layer-first is *fine* for a small or purely-CRUD app. The pain grows with the number of domains.

---

## What counts as a "domain"?

A domain is a slice of the **business**, not the tech. It's a noun in the product that has its own rules, its own data, and its own lifecycle.

- ✅ Domains: `user`, `company`, `pipeline`, `invoice`, `subscription`
- ❌ Not domains: `logging`, `validation`, `database` — these are infrastructure and belong in `shared/`.

**Quickest test:** listen to how non-engineers (product, sales, support) talk. The nouns that come up again and again are your domains. *"When a deal moves to a new stage in the pipeline"* — that sentence names domain concepts.

More checks:
- Would it have its own rules even if the rest of the app didn't exist?
- Does it own its own core data and lifecycle (created → verified → deactivated)?
- Could one small team own it end to end?
- Does it change for its *own* reasons?

**On sizing:** if two concepts are almost always used and changed together, keep them in one domain (`pipeline` + `stage`). If they evolve independently, split them (`pipeline` vs `billing`). When unsure, start a new concept *inside* the closest existing domain and only promote it to its own module once it clearly outgrows that home. Splitting later is easy; undoing a premature split is annoying.

---

## "But domain grouping clutters interconnected calls!"

This comes up a lot, and it's worth addressing head-on.

**Domain grouping doesn't create cross-calls — it makes them visible.** In layer-first, `userService` importing `companyService` looks local because both sit in `services/`, so nobody notices the coupling. In domain-first the same import becomes a cross-folder dependency you can *see*. That feels worse, but it's diagnostic: the structure is surfacing coupling that was always there. Switching back to layer-first just re-hides it.

Here's how to keep cross-domain calls from becoming a mesh.

**1. A stubborn tangle is usually a missing domain.**
When two domains constantly reach into each other, there's often a *third* concept that owns their interaction and hasn't been named yet.

```
Before:  user  ⇄  company        (bidirectional tangle)

After:   user  →  membership  ←  company
         (both depend on the new concept, one direction each)
```

**2. Enforce a dependency direction.**
Decide which domains are foundational (others may depend on them) and which are downstream. Keep the dependency graph **acyclic** — circular dependencies between domains are what actually turn a codebase into mud. A lint rule (`dependency-cruiser`, `eslint-plugin-boundaries`) can fail the build when a cycle appears.

**3. Give each domain a narrow public surface.**
Each domain exposes one small, deliberate entry point and hides its internals. Other domains touch only that surface, never the guts. This is the line between "modular" and "just folders."

**4. Pull cross-domain coordination into an orchestration layer.**
Don't chain domain A → B → C. Put a use-case / application layer *above* the domains to coordinate them, so the domains stay ignorant of each other.

```
CreatePipelineForCompany  (use case, lives in the app/orchestration layer)
        ├── user.service        "is this user allowed?"
        ├── company.service     "does this company exist?"
        └── pipeline.service    "create it"
# user, company, and pipeline never call each other directly
```

**5. For fire-and-forget reactions, use events.**
If deactivating a `user` should trigger three other domains, a `user.deactivated` event they subscribe to beats three direct calls. Use sparingly — events add indirection and make flows harder to trace, so reach for them only when synchronous coupling is genuinely painful.

---

## TL;DR

- Default to **domain-first**; add a `shared/` module for cross-cutting concerns.
- A **domain** = a business noun with its own rules, data, and lifecycle — found by listening to how the product is described.
- Keep each domain's internal layout consistent (`controller / service / repository / entity`).
- If cross-calls feel tangled, the fix is at the **dependency and boundary** level — look for a missing domain, enforce direction, keep a narrow public API, and orchestrate above the domains. Don't retreat to layer-first; that only hides the problem.
- **In the AI era this matters more, not less:** structure is now about bounding what any single change — human or AI — can touch and require. It shrinks the context an agent needs to be correct and keeps changes reviewable.

---

## Appendix: Does this still matter in the AI era?

Short answer: the *reasons* shift, but structure matters **more**, not less.

**What AI weakens.** A lot of the classic case for structure was human ergonomics — discoverability, holding a module in your head, not tiring from jumping across folders to make one change. An AI agent doesn't care: it can grep the whole repo instantly, doesn't context-switch-fatigue, and can hold far more in view than we can. So "domain-first saves you navigation" is now a smaller benefit.

**What AI makes more important.** The deeper reason for structure was never the folders — it was the **dependency graph**: coupling, boundaries, blast radius. The bottleneck has moved from *writing* code (now cheap) to **context and review** (now scarce), and both are helped directly by boundaries:

- **Context is finite.** A feature in one well-bounded module lets an agent load just that module, change it correctly, and stop. Smeared across a tangled graph, the agent needs half the repo in context to be safe — exactly where it starts making confident, subtle mistakes. Clean boundaries shrink the context an AI needs to be correct.
- **Coupling hurts AI like it hurts us.** In a cyclic, tightly-coupled codebase, a change ripples unpredictably. An AI will often produce something that compiles, looks plausible, and quietly breaks a caller three modules away. Acyclic, well-bounded structure is what makes the blast radius **knowable** — and knowable blast radius is what lets us trust AI-generated changes at all.
- **Review is the new constraint.** You can generate a thousand lines in a minute; you still have to review them. A change contained to `pipeline/` is reviewable. A change touching twelve files across the tree is where review breaks down and bugs slip through.
- **AI accelerates entropy.** Because it produces code so fast, an AI-heavy workflow piles up volume quickly — and volume without structure decays into mud faster than a human team ever could. Structure is the guardrail that keeps speed from becoming a mess.

**The reframe:** in the AI era, structure stops being about *human navigation* and becomes about **bounding what any single change — human or AI — can touch and require.** The specific "one folder or four?" question matters a little less; "keep dependencies acyclic, give modules a narrow public surface, don't let everything call everything" matters a lot more — and everything above is how we do that.
