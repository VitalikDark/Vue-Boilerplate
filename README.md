# Front-end test task: News application (Vue 3)

This template should help get you started developing with Vue 3 in Vite.

## Goal

Build a small SPA that displays news content. We want to see Vue 3 fundamentals, async data flow, sensible state
management, and a clean structure. Questions welcome.

## Time expectation

- Estimation is around 3-4 hours. We don't want you to spend more than that.
- If you run out of time, prioritize clarity and correctness over extra features.
- Add a short **“Next steps”** section in the README (what you’d improve with more time).

## Scope

### Layout

Create a responsive layout (mobile + desktop) that includes:

- header/user info area
- main content with news
- footer with contacts/links

### News list

A list of news items where each item shows:

- image
- title
- short description
- author
- publication date

### News details (optional page, do if you have time)

A details page accessible from the list. Has same as list items, but without description and has a news text.

## [Design](https://www.figma.com/design/xH85WATOooV8cSb6bkMqlE/Test-task)

Follow the design direction; implementation details are up to you (pixel-perfect not required).

## Data (async)

- Load news **asynchronously** using **mock data** (local JSON or similar).
- No real API integration is required.

## State management (Pinia)

Use Pinia where shared state makes sense.

## Code quality

- Meaningful structure and component split (avoid “everything in one file”)
- Clear naming and readable code
- TypeScript usage preferable as we're using it in our projects
- Avoid overengineering

## UI/UX

- Should work well on mobile and desktop.
- Pay attention to typical app behavior and small details (your judgment).

## Deliverables

- Git repository with the solution
- `README.md` with:
    - brief notes on decisions (structure/state/data approach) if you want
    - “Next steps”, if you didn't have enough time to implement everything you wanted

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run eslint-fix
```

## Implementation Notes

### Structure

Проєкт організований за принципом feature-based структури:

- `src/types/` - TypeScript типи
- `src/stores/` - Pinia stores для state management
- `src/services/` - Сервіси для роботи з даними
- `src/data/` - Mock дані (JSON)
- `src/components/layout/` - Компоненти макету (Header, Footer)
- `src/components/news/` - Компоненти новин (Card, Meta)
- `src/components/icons/` - SVG іконки як Vue компоненти
- `src/views/` - Сторінки додатку (NewsList, NewsDetail)
- `src/styles/` - Глобальні стилі (Tailwind 4.0 configuration)
- `src/router/` - Конфігурація роутингу

### State Management

Використано Pinia для управління станом новин:
- `newsStore` містить список новин, стан завантаження та помилки.
- Дані завантажуються асинхронно при першому зверненні та кешуються.
- Реалізовано метод `getNewsById` для миттєвого доступу до деталей.

### Data Flow

- Дані зберігаються в `src/data/mockNews.json` та імпортуються сервісом.
- Симулюється асинхронна затримка завантаження для демонстрації loading states.
- Сторінка деталей обробляє "сирий" текст, перетворюючи його на абзаци та цитати (за допомогою специфічних маркерів `\n\n` та `>`).

### UI/UX Decisions

- **Tailwind 4.0**: Використано новітню версію з конфігурацією через CSS змінні (`@theme`).
- **Typography**: Інтегровано шрифт Lato, кастомні розміри (`text-12`, `text-16`, `text-22`, `text-28`) та ваги.
- **Icons**: Створено систему SVG-компонентів, що підтримують `currentColor` для легкої стилізації через класи.
- **Responsive**: Адаптація під різні екрани (від mobile до 1600px+ з відступами 215px).
- **Rich Text**: Підтримка абзаців та стилізованих цитат у тексті новин.
- **Loading states**: Анімовані спінери під час завантаження даних.

### Technologies Used

- **Vue 3** (Composition API, Script Setup)
- **TypeScript**
- **Pinia**
- **Vue Router**
- **Tailwind CSS 4.0** (PostCSS)
- **Vite**

## Next Steps

Через обмеження часу, наступні покращення були б пріоритетними:

1.  **Тестування**: Додавання Unit тестів для stores та сервісів, а також Component tests (Vitest + Vue Test Utils).
2.  **Skeleton Loaders**: Заміна стандартних спінерів на скелетони для більш "плавного" сприйняття завантаження.
3.  **Пошук та фільтрація**: Можливість швидкого пошуку новин за заголовком або автором.
4.  **SEO & Meta**: Додавання динамічних мета-тегів для кожної новини (VueUse `useHead`).
5.  **Infinite Scroll**: Якщо новин стане багато, варто реалізувати порційне завантаження.
6.  **Image Optimization**: Використання сучасних форматів (WebP) та lazy-loading для пришвидшення LCP.
7.  **Transition Effects**: Додавання плавних переходів між сторінками за допомогою `<Transition>`.
8.  **Dark Mode**: Повна підтримка темної теми через класи Tailwind.
9.  **Error Boundaries**: Більш деталізована обробка помилок (наприклад, при відсутності інтернету або помилці парсингу JSON).
10. **A11Y**: Повне тестування на доступність (Screen readers, клавіатурна навігація).
