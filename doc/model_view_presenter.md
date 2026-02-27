# Model-View-Presenter (Passive View)

## What is MVP and Passive View?
Model-View-Presenter (MVP) is a UI architectural pattern that separates the application logic (Presenter), the UI (View), and the data (Model). "Passive View" is a strict variant where the View is kept as simple as possible—it only displays what it’s told and delegates all logic, updates, and synchronization to the Presenter.

**Key ideas:**
- The View has no knowledge of the Model (no direct references).
- The Presenter handles all the communication between Model and View.
- The Presenter tells the View exactly what and how to display; the View is passive and dumb.
- Improves testability—Presenters can be tested with a Test Double (mock) for the View.

For a detailed explanation, see:
[Passive View – Martin Fowler](https://martinfowler.com/eaaDev/PassiveScreen.html)

## How does it work?
- The user interacts with the View (e.g., clicks or types).
- The View passes these events straight to the Presenter.
- The Presenter updates the Model, fetches any data needed, and instructs the View on what to display (e.g., setTimerDisplay(remainingSeconds)).
- The View just follows orders.

**Diagram:**
```
User → View → Presenter ⇄ Model
              ↓
         (View updated
          only via Presenter)
```

## Why use Passive View?  
- **Testing:** With a truly passive view, you can thoroughly unit-test the Presenter logic without needing the UI at all.
- **Simplicity:** The View doesn’t have logic—it just displays and fires events, so bugs are less likely there.
- **Explicitness:** All UI changes are explicit in the Presenter, making logic and update flows easier to trace and debug.

## MVP with Passive View in LeanTime
LeanTime’s frontend applies this pattern. For example:
- `View` (src/client/view.ts) only interacts with DOM and triggers events.
- `Presenter` (src/client/presenter.ts) receives all UI events, updates the timer via the Service, and instructs the View EXACTLY how to update all UI widgets.
- This means you can write unit tests for the Presenter without rendering the UI.

In summary: **Passive View decouples UI and logic, driving maintainability and testability in rich JavaScript/TypeScript applications.**

---
**Further reading:**
- Original: [Passive View (martinfowler.com)](https://martinfowler.com/eaaDev/PassiveScreen.html)
- See also: [Supervising Controller](https://martinfowler.com/eaaDev/SupervisingPresenter.html) and [Presentation Model](https://martinfowler.com/eaaDev/PresentationModel.html)

© Adapted summary from Martin Fowler, 2006