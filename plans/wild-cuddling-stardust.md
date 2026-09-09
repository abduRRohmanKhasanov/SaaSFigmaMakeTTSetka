# Plan: Table Tennis Club — Mobile Web App

## Context

Мобильное веб-приложение для клуба настольного тенниса. Phone-first (390×844), макс ширина 480px.
Фронтенд с моковыми данными — никаких Supabase, авторизации, БД.
Язык интерфейса: русский. Строгая терминология: «встреча», «партия», «очко», «состав», «рейтинг», «место».

---

## Стек

- React 19 + Vite 8 + Tailwind CSS v4
- lucide-react (иконки)
- react-router-dom (роутинг)
- clsx (утилита cn)
- Radix UI: @radix-ui/react-dialog, @radix-ui/react-slot, @radix-ui/react-progress, @radix-ui/react-checkbox, @radix-ui/react-label
- shadcn/ui CLI **не используем** (несовместим с Tailwind v4) — компоненты пишем вручную
- Никаких hex-кодов и палитровых классов Tailwind в компонентах

---

## Шаг 1 — Зависимости

```bash
pnpm add lucide-react react-router-dom clsx
pnpm add @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-progress
pnpm add @radix-ui/react-checkbox @radix-ui/react-label
```

---

## Шаг 2 — `src/index.css` (полная замена)

Порядок блоков (строго):
1. `@import` Google Fonts — **Roboto Flex**
2. `@import 'tailwindcss'`
3. `@theme inline { ... }` — маппинг MD3 переменных в Tailwind-утилиты
4. `:root { ... }` — светлая тема, палитра teal (по умолчанию)
5. `.dark { ... }` — тёмная тема teal
6. `.theme-blue`, `.theme-indigo`, `.theme-crimson`, `.theme-orange`, `.theme-graphite` — светлые палитры
7. `.dark.theme-*` — тёмные варианты
8. Типографические утилиты (`.display-large` … `.label-small`)
9. Elevation utilities (`.elevation-1/2/3`)
10. Базовые стили `body`, `html`, `#root`

### Полный набор MD3 цветовых ролей (oklch)

```
--md-primary / --md-on-primary / --md-primary-container / --md-on-primary-container
--md-secondary / --md-on-secondary / --md-secondary-container / --md-on-secondary-container
--md-tertiary / --md-on-tertiary / --md-tertiary-container / --md-on-tertiary-container
--md-error / --md-on-error / --md-error-container / --md-on-error-container
--md-surface / --md-on-surface / --md-surface-variant / --md-on-surface-variant
--md-surface-container-lowest / -low / (без суффикса) / -high / -highest
--md-outline / --md-outline-variant
--md-inverse-surface / --md-inverse-on-surface / --md-inverse-primary
--md-scrim
```

### @theme inline маппинг → Tailwind-утилиты

`bg-primary`, `text-on-primary`, `bg-primary-container`, `text-on-primary-container`,
`bg-secondary`, `text-on-secondary`, `bg-secondary-container`, `text-on-secondary-container`,
`bg-tertiary`, `text-on-tertiary`, `bg-surface`, `text-on-surface`,
`bg-surface-variant`, `text-on-surface-variant`,
`bg-surface-container`, `bg-surface-container-low`, `bg-surface-container-high`, `bg-surface-container-highest`, `bg-surface-container-lowest`,
`bg-error`, `text-on-error`, `bg-error-container`, `text-on-error-container`,
`text-outline`, `border-outline`, `border-outline-variant`

### 6 палитр (бренд-цвет базовый)

| Класс           | Базовый цвет          |
|-----------------|-----------------------|
| `.theme-teal`   | Глубокий бирюзово-зелёный (по умолчанию) |
| `.theme-blue`   | Синий                 |
| `.theme-indigo` | Индиго                |
| `.theme-crimson`| Бордовый              |
| `.theme-orange` | Оранжевый             |
| `.theme-graphite`| Графитовый           |

Палитра платформы (`/`, `/login`, `/register`, `/platform`) — всегда `.theme-teal`, не зависит от клуба.

### Типографическая шкала MD3 (Roboto Flex)

15 ступеней: display-large/medium/small, headline-large/medium/small, title-large/medium/small, body-large/medium/small, label-large/medium/small.

### Скругления

```
--radius-xs: 0.25rem     /* chips */
--radius-sm: 0.5rem
--radius-md: 0.75rem     /* text fields */
--radius-lg: 1rem
--radius-xl: 1.25rem     /* карточки */
--radius-full: 9999px    /* кнопки-pill */
```

### Elevation

```
.elevation-1 — лёгкая
.elevation-2 — средняя
.elevation-3 — заметная
```

---

## Шаг 3 — `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
export function cn(...inputs: ClassValue[]) { return clsx(inputs); }
```

---

## Шаг 4 — Роутинг (`main.tsx` + `App.tsx`)

`main.tsx` — обернуть в `BrowserRouter`.

`App.tsx` — три оболочки + вложенные маршруты:

```
/ → LandingPage
/login → LoginPage
/register → RegisterPage
/platform → PlatformShell → MyClubsPage
/platform/empty → EmptyClubsPage
/platform/new → NewClubPage

/club → PlayerShell (нав: Лента / Рейтинг / Профиль / Правила)
  /club → FeedPage
  /club/empty → FeedEmptyPage
  /club/rating → RatingPage
  /club/profile → ProfilePage
  /club/profile/selected → ProfileSelectedPage
  /club/player/:id → PlayerCardPage
  /club/h2h/:id1/:id2 → H2HPage
  /club/tournaments → TournamentsPage
  /club/tournaments/:id → TournamentCardPage
  /club/rules → RulesPage

/admin → AdminShell (нав: Дашборд / Состав / Турниры / Настройки)
  /admin → DashboardPage
  /admin/players → PlayersPage
  /admin/players/:id → PlayerEditPage
  /admin/tournaments → AdminTournamentsPage
  /admin/tournaments/new → NewTournamentPage
  /admin/tournaments/:id → AdminTournamentCardPage
  /admin/tournaments/:id/console → ConsolePage (оболочка задачи)
  /admin/settings → SettingsPage
  /admin/tables → TablesPage
  /admin/audit → AuditPage

/referee → RefereePage (оболочка задачи)

/styleguide → StyleguidePage
```

---

## Шаг 5 — Три оболочки

### PlayerShell (`src/layouts/PlayerShell.tsx`)
- Top App Bar: логотип-кружок + название клуба цветом `text-primary`, справа иконка входа (LogIn). Колокольчика НЕТ.
- Bottom Nav: 4 пункта — Лента (Rss), Рейтинг (BarChart2), Профиль (User), Правила (BookOpen). Активный: залитая иконка + pill-индикатор под иконкой. Неактивный: контурная. Подписи всегда видны. Пункта «Админка» НЕТ.
- `<Outlet />` между панелями.

### AdminShell (`src/layouts/AdminShell.tsx`)
- Top App Bar: название клуба, нажатие → переход на `/club`.
- Bottom Nav: 4 пункта — Дашборд (LayoutDashboard), Состав (Users), Турниры (Trophy), Настройки (Settings). Пунктов «Столы» и «Встречи» НЕТ.

### TaskShell (`src/layouts/TaskShell.tsx`)
- Только Top App Bar: стрелка «назад» (ArrowLeft), заголовок, подзаголовок. Нижней навигации НЕТ.
- Используется для: ConsolePage, RefereePage.

---

## Шаг 6 — UI-компоненты (`src/components/ui/`)

| Файл | Варианты |
|------|----------|
| `button.tsx` | filled, tonal, outlined, text; sizes: default, sm, icon |
| `card.tsx` | elevated, filled, outlined |
| `text-field.tsx` | outlined; состояния: default, focused, error, disabled |
| `chip.tsx` | assist, filter (с иконкой и без) |
| `fab.tsx` | primary, surface; extended вариант |
| `dialog.tsx` | через @radix-ui/react-dialog |
| `progress.tsx` | linear через @radix-ui/react-progress |
| `top-app-bar.tsx` | small, center-aligned |
| `bottom-nav.tsx` | 3–5 пунктов, min-h-20, touch-target ≥ 48px |
| `list-item.tsx` | leading icon, trailing text, divider |
| `avatar.tsx` | инициал, цветной фон из primary-container |
| `level-chip.tsx` | L1 / L2 / L3 чипы |

Минимальная зона нажатия — 48×48px для каждого интерактивного элемента.

---

## Шаг 7 — `src/mocks/`

Один файл на экран:
```
src/mocks/
  club.ts           — название, палитра, логотип
  champion.ts       — данные чемпиона
  feed.ts           — события ленты
  players.ts        — состав, рейтинг, статистика
  tournaments.ts    — список и карточки
  h2h.ts            — личные встречи
  rules.ts          — текст правил
  dashboard.ts      — данные дашборда
  referee.ts        — состояние встречи
  platform.ts       — список клубов
```

Диапазон рейтинга в моках: 100–700.

---

## Шаг 8 — Ключевые экраны

### /club — ЛЕНТА
1. Блок чемпиона: аватар, имя, «Чемпион клуба», рейтинг. Визуально главный.
2. Карточка текущего/последнего турнира: название, дата, статус-чип, ссылка «Все турниры». Кнопки «Записаться» НЕТ.
3. Тональное окошко событий (`bg-surface-container-low`): плотный список строк с тонкими разделителями. Строка: круглая иконка в цветном контейнере, чип типа (Анонс/Встреча/Чемпион/Достижение), заголовок, время. Шапка: название и дата турнира. Внизу кнопка «Раньше».
4. /club/empty — пустое состояние без турниров.

### /club/rating — РЕЙТИНГ
Таблица: место, аватар-инициал, имя, крупный рейтинг, чип уровня.
Фильтр-чипы: Все / L1 / L2 / L3 + поиск по имени.

### /club/profile — ПРОФИЛЬ (3 состояния)
- Пустое: текст + кнопка «Выбрать игрока».
- Выбор: полноэкранный диалог со списком, поиском, кнопкой «Открепить».
- Выбран: публичная карточка игрока + «Сменить» в top bar.

### /club/player/:id — КАРТОЧКА ИГРОКА
Шапка: аватар, имя, чип уровня, крупный рейтинг, место, дата рождения.
Полоса статистики, список последних встреч (соперник, счёт по партиям, цвет победы/поражения), блок достижений. Каждая встреча — переход на H2H.

### /referee — СУДЕЙСКИЙ ЭКРАН (наиболее важный)

Оболочка задачи (TaskShell). Контекст: одна рука, шумный зал, взгляд на игру.

Сверху вниз:
1. Имена двух игроков + счёт по партиям (например 1:1).
2. **Огромное табло**: два числа размером ~50vw высотой, разделённые двоеточием. Это главный элемент.
3. Индикатор подачи: кто подаёт, сколько подач до перехода.
4. Две кнопки «+1» — каждая на половину ширины экрана, высота ≥ 96px.
5. Текстовая кнопка «Отменить очко» — заметно, но не рядом с «+1».
6. По окончании партии (11 очков, преимущество 2): подтверждение + «Следующая партия».
7. По окончании встречи: победитель, счёт по партиям, счёт каждой партии, «Подтвердить результат» → «Результат отправлен» (кнопок ввода нет).

### /admin — ДАШБОРД
1. Карточка: одна главная залитая кнопка с меняющейся подписью: «Объявить турнир» / «Запустить турнир» / «Управление турниром».
2. Карточка чеклиста запуска: linear progress + пункты + крестик «скрыть».
3. Сводка: количество игроков, ближайший турнир, последние встречи.

### /admin/tournaments/new — НОВЫЙ ТУРНИР
Одна форма: название, дата и время, выбор формата карточками (Круговая система / Олимпийская с выбыванием / Групповой этап + сетка), набор участников чекбоксами с фильтром по уровню. Никакого мастера шагов.

### /admin/tournaments/:id/console — ПУЛЬТ (TaskShell)
Top bar: стрелка назад, название турнира, кнопка «Состав».
Карточки столов (Стол 1, Стол 2): текущая встреча, счёт по партиям, «Открыть судейский экран».
Очередь встреч. Кнопка «Завершить турнир».

### / — ЛЕНДИНГ ПЛАТФОРМЫ
Обложка: название сервиса, одна залитая кнопка «Создать клуб», рядом текстовая «Войти».
Три блока «как это работает». Краткий футер. Трёх одинаковых кнопок подряд НЕТ.

### /platform/new — СОЗДАНИЕ КЛУБА
Одна форма: название, адрес (с подписью «латиница»), выбор палитры кружками из 6 вариантов. Никакого мастера. Никакой пипетки.

### /admin/settings — НАСТРОЙКИ
Секции: название + логотип, выбор палитры кружками, правила (количество партий, очков), рейтинг (включён, стартовое).
Список-строки со стрелками: «Столы и QR», «Журнал действий».

---

## Шаг 9 — /styleguide

Sticky-шапка: переключатель свет/тёмная + 6 кнопок палитр.
Разделы: все цветовые роли MD3, типографическая шкала, кнопки (filled/tonal/outlined/text), поля ввода (все состояния), карточки, чипы, FAB, список с divider, Top App Bar, Bottom Nav, диалог (живой через Radix), linear progress.

---

## Структура файлов

```
src/
  components/ui/
    avatar.tsx, bottom-nav.tsx, button.tsx, card.tsx, chip.tsx,
    dialog.tsx, fab.tsx, level-chip.tsx, list-item.tsx,
    progress.tsx, text-field.tsx, top-app-bar.tsx
  layouts/
    PlayerShell.tsx
    AdminShell.tsx
    TaskShell.tsx
  lib/
    utils.ts
  mocks/
    champion.ts, club.ts, dashboard.ts, feed.ts,
    h2h.ts, platform.ts, players.ts, referee.ts,
    rules.ts, tournaments.ts
  pages/
    platform/  LandingPage, LoginPage, RegisterPage, MyClubsPage, NewClubPage
    club/      FeedPage, FeedEmptyPage, RatingPage, ProfilePage,
               PlayerCardPage, H2HPage, TournamentsPage, TournamentCardPage, RulesPage
    admin/     DashboardPage, PlayersPage, PlayerEditPage, AdminTournamentsPage,
               NewTournamentPage, AdminTournamentCardPage, ConsolePage,
               SettingsPage, TablesPage, AuditPage
    referee/   RefereePage
    StyleguidePage.tsx
  App.tsx
  index.css
  main.tsx
```

---

## Порядок реализации

1. `index.css` — MD3 токены, 6 палитр, тёмная тема, типографика
2. `lib/utils.ts` + установка зависимостей
3. UI-компоненты (`src/components/ui/`)
4. Оболочки (PlayerShell, AdminShell, TaskShell)
5. Роутинг (main.tsx, App.tsx)
6. Моки (`src/mocks/`)
7. `/styleguide` — демонстрация дизайн-системы
8. Экраны платформы (`/`, `/login`, `/register`, `/platform`, `/platform/new`)
9. Экраны витрины клуба (`/club/*`)
10. Судейский экран `/referee` (в приоритете, делать особенно тщательно)
11. Кабинет администратора (`/admin/*`)

---

## Проверка

- `/styleguide`: переключить тему и все 6 палитр
- DevTools → 390px → все экраны корректны
- Проверить, что нет hex-кодов и палитровых классов в компонентах (grep)
- touch-target ≥ 48px для всех интерактивных элементов
- `/referee`: табло читается с метра, кнопки «+1» не путаются с «Отменить»
- Терминология: нет слов «сет», «игрок» (только «состав»), «записаться»
