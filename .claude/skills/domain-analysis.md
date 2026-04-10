# Skill: Domain Analysis

This skill runs before every screen or feature request.
**No code is written until analysis is complete.**

---

## Purpose

Identify missing context in the user's request, surface domain knowledge,
and clarify the user journey. The analysis output is the input for the `screen-generation.md` flow.

---

## Step 1 — Understand the Intent

Read the user's request as-is.
Do not assign a category label.

Try to understand:
- What does the user want to do?
- Is this on top of something existing, or is it new?
- How wide is the scope?

Reflect your understanding back to the user in a short sentence.
If you misunderstood, let them correct it — then continue.

---

## Step 2 — Build the Context Map

Do not proceed to production until **all** of the following are known.
For each item: if known ✓, if unknown → ask.

### 2a. Domain Context
- [ ] Which module / business process does this screen belong to?
      *(e.g. the module or business process this screen belongs to)*
- [ ] Who is the user operating on this screen?
      *(e.g. the type of person who will use this screen)*
- [ ] What is the user's primary task on this screen?
      *(Decide / Enter data / Monitor / Approve)*
- [ ] Is this screen connected to other screens?
      *(Where do users come from, where do they go next)*

### 2b. Data Context
- [ ] What data types will be displayed / edited?
      *(SKU, order, date, quantity, currency, percentage, status)*
- [ ] What is the data volume?
      *(How many table rows, KPIs, filters)*
- [ ] What is the data refresh frequency?
      *(Real-time, daily batch, static)*
- [ ] What does an empty data state mean?
      *(No records exist / not yet loaded / filter result)*

### 2c. Action Context
- [ ] What should the user be able to do on this screen?
      *(Read / Edit / Approve / Delete / Export / Import)*
- [ ] Are there critical / irreversible actions?
      *(Operations requiring a confirm modal)*
- [ ] Is bulk action required?
- [ ] Are there permission / role-based view differences?

### 2d. Technical Context
- [ ] Is this being built on top of an existing page?
      *(If yes, file path)*
- [ ] Is there API / data source information available?
- [ ] Was a Figma link provided?
- [ ] Are there specific constraints?
      *(Performance, accessibility, responsive behavior)*

---

## Step 3 — Ask for Missing Information

For items left blank in the context map, ask all questions in **a single message**.
Group questions, number them, keep them concise.

```
A few things to clarify before I start:

**Domain:**
1. Which module or business area does this screen belong to?
2. What is the user role?

**Data:**
3. Roughly how many columns / rows are expected in the table?
4. Which filters should be available?

**Actions:**
5. Will the user be able to edit data, or is this read-only?
```

Wait for responses. If an answer is missing, apply a reasonable assumption and state it explicitly.

---

## Step 4 — Write the Domain Model Summary

Once all information is gathered, produce the following format:

```
## Domain Summary

**Module:** [Module name]
**User:** [Role]
**Primary Task:** [One sentence]
**Screen Type:** [Dashboard / Data Entry / Review & Approve / Report / Wizard]

**Data Structure:**
- Primary entity: [e.g. Transfer Order]
- Related entities: [e.g. Store, SKU, Supplier]
- Key metrics: [e.g. Total quantity, Delivery date, Status]

**User Journey:**
1. Arrives from [previous screen]
2. Performs [primary action]
3. Result → [next screen or state]

**Critical States:**
- Loading: [What happens]
- Empty: [What is shown, why it's empty]
- Error: [Error source and recovery path]

**Assumptions:**
- [Assumptions made for unanswered or unasked questions]
```

---

## Step 5 — Get Approval

The Domain Summary is shown to the user.

```
This is my understanding. Shall I proceed,
or is there anything you'd like to correct?
```

Only move to `screen-generation.md` Phase 1 after approval.
Do not write any code without approval.

---

## Default Assumptions

If the user does not respond or says "you decide", apply these defaults:

| Topic | Assumption |
|-------|------------|
| Table size | 50–100 rows, pagination active |
| User role | Business analyst / planner |
| Editing | Read-only (None Editable) unless specified otherwise |
| Empty state | "No records found yet" + relevant CTA |
| Error state | Toast notification + retry option |
| Filters | At least 2 filters (date range + category) |
| Data frequency | Daily batch, not real-time |

List all applied assumptions explicitly in the Domain Summary.
