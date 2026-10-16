# GEMINI.md — Portfolio

## Working Principles

You are working on a personal portfolio website. Work like a pragmatic senior engineer: make the smallest correct change, preserve existing conventions, and avoid unnecessary investigation.

### 1. Inspect Only What the Task Requires

- Start with the user's request and the files or symbols it directly points to.
- For a small, clear change, inspect only the relevant component, function, route, or configuration.
- Search for references only when needed to understand a contract, shared behavior, or likely side effects.
- Do not read the entire repository, enumerate every directory, or inspect unrelated files "for context."
- Do not repeatedly reopen or reread files whose relevant contents you already understand.
- Prefer targeted search, symbol lookup, and narrow file ranges over dumping large files or command output.
- Expand the scope only when the first evidence reveals a real dependency, ambiguity, or risk.

### 2. Use CodeGraph for Project Context

- Use CodeGraph to understand code relationships and relevant project context instead of manually exploring the repository to reconstruct the architecture.
- Start with a targeted CodeGraph query around the symbol, file, feature, or call path involved in the task.
- Use the graph to identify relevant callers, callees, dependencies, and related symbols. Inspect source files only where needed to confirm implementation details.
- Do not use CodeGraph as a reason to perform a broad investigation. Keep queries scoped to the requested change and stop when you have enough context to act safely.
- If CodeGraph is unavailable, returns insufficient information, or does not cover the relevant code, fall back to targeted search and direct inspection of only the necessary files. Do not repeatedly retry it or inspect the entire repository.
- Treat CodeGraph results as navigation and context, not unquestionable proof. Verify important behavior in source code before making consequential changes.

### 3. Be Evidence-Led, Not Overconfident

- Do not claim to understand the architecture or root cause before the relevant evidence supports that conclusion.
- Treat guesses as guesses. If a detail is not established by the code or the user's instructions, do not present it as fact.
- Before changing behavior, identify the specific code path responsible and the intended outcome.
- For bugs, follow the smallest relevant path from input to behavior. Avoid speculative investigations into unrelated systems.
- If the request is clear, proceed. Ask a question only when an unresolved ambiguity materially changes the implementation or could cause destructive behavior.
- If evidence is incomplete but the change is low-risk, make the narrowest reasonable implementation and state any important assumption briefly.

### 4. Prefer Direct Implementation

- For clear, scoped requests, implement the change directly. Do not produce a lengthy plan or narrate routine steps.
- Keep changes proportional to the request. Avoid unrelated refactors, abstractions, dependencies, formatting churn, or opportunistic cleanup.
- Reuse existing patterns and utilities when appropriate instead of introducing a new pattern without a concrete reason.
- Preserve current behavior outside the requested scope.
- Do not add defensive code, fallback layers, comments, or abstractions without a specific need.
- Do not silently change the site's content, visual identity, navigation, or behavior beyond the request.
- If the requested approach conflicts with the existing design or architecture, explain the specific issue and choose the smallest appropriate alternative.

### 5. Validate Selectively

Do **not** automatically run tests, builds, linting, type checks, or other checks after every implementation.

Run checks when they are directly relevant, especially when:

- Fixing a reported type error, compilation/build failure, or test failure.
- Changing types, configuration, or code where type correctness is central to the task.
- The user explicitly requests verification.
- A change has a specific, meaningful risk that a targeted check can detect.

Otherwise, finish after reviewing the diff and checking the edited code for obvious mistakes. Do not run a broad validation suite just out of habit.

When validation is warranted:

- Run the narrowest useful command first.
- Do not run the same check repeatedly unless a change or new evidence justifies it.
- If a check fails, inspect the relevant output and fix the cause; do not launch unrelated checks.
- Never claim that a check passed unless you actually ran it and saw the result.
- If you did not run checks, say so only when that information matters to the user.

### 6. Commit Completed Work

- After finishing the requested implementation, create a Git commit for the changes you made.
- Before committing, inspect `git status` and the diff. Stage only files related to the current task; never commit unrelated user changes.
- Use a concise, descriptive commit message that explains the change, following the repository's existing commit-message convention when one is apparent.
- Do not amend existing commits, force-push, or rewrite history unless the user explicitly asks.
- If there are no changes to commit, do not create an empty commit.
- If committing is blocked by missing Git identity, repository state, hooks, or another concrete issue, report the blocker instead of claiming a commit was created.
- Do not run tests or broad checks solely to justify making a commit. Follow the selective validation rules above.

### 7. Provide a Pull Request Title and Description

- After creating the commit(s), output a proposed pull request (PR) title and description/message for the completed work.
- Make the title concise, specific, and action-oriented. Follow the repository's existing PR conventions when apparent.
- Make the description ready to paste into a PR: summarize what changed, why it changed, and any important implementation details or user-visible effects.
- Include testing and validation details accurately. Clearly state when no checks were run; never imply that checks passed if they were not run.
- Keep the description proportional to the change. A small fix needs only a short description; do not generate a lengthy template for trivial work.
- If the work is not committed because of a blocker, still provide the proposed PR title and description for the changes made, and clearly report the commit blocker.
- Do not claim that a PR was created or opened. Only provide the title and description unless the user explicitly asks you to create a PR and the available tools support it.

### 8. Control Context and Token Use

- Keep investigation and responses concise.
- Do not dump large files, logs, search results, or command output into context when a targeted excerpt will answer the question.
- Avoid repeating findings already established in the current task.
- Do not create a long checklist for a small change.
- Do not continue investigating once there is enough evidence to implement and reasonably assess the change.
- If context is becoming large, summarize only the decisions, relevant contracts, and unresolved questions needed to continue. Do not preserve unrelated details.

## Portfolio-Specific Guidance

- Treat the portfolio as a personal professional website whose purpose is to present the owner's work, skills, projects, and experience clearly.
- Preserve the existing visual identity, design direction, typography, color palette, spacing system, and interaction patterns unless the request explicitly calls for a change.
- Prioritize visual consistency, clear hierarchy, readable content, and purposeful interactions.
- Ensure UI changes remain responsive across mobile, tablet, and desktop layouts.
- Consider accessibility when implementing UI: semantic HTML, keyboard navigation, visible focus states, sufficient contrast, and appropriate accessible names.
- Avoid unnecessary animation, excessive visual effects, and interactions that make the website slower or harder to use.
- Preserve performance. Avoid unnecessarily large dependencies, expensive client-side JavaScript, excessive re-renders, and unoptimized assets.
- Preserve SEO fundamentals where applicable, including page metadata, semantic structure, descriptive links, and meaningful image alternative text.
- Keep portfolio content accurate. Never invent projects, employment history, credentials, client relationships, achievements, testimonials, or measurable results.
- Reuse existing design patterns and components rather than creating visually inconsistent alternatives.
- Avoid uppercase text and visible borders: Maintain a minimalist, soft, human aesthetic by avoiding all-caps/uppercase styling and visible borders across components and layouts.
- Animation framework: Use GSAP exclusively for animations across the website (with @gsap/react and gsap); do not use Framer Motion.
- Do not introduce unnecessary backend services, dependencies, infrastructure, or complex abstractions for a primarily presentational website.
- Do not assume a feature, design system, framework, or architecture exists. Confirm only the relevant implementation when the task depends on it.

## Component Size and Reusability

- For UI components, aim to keep each component at **80 lines of code or fewer** whenever practical. Treat this as a guideline, not an absolute rule.
- When a component grows too large or mixes distinct responsibilities, look for clear
