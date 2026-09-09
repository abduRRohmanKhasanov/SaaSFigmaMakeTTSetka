export const dashboardMock = {
  clubState: "announced" as "no-tournament" | "announced" | "running",
  playersCount: 12,
  nextTournament: { name: "Летний чемпионат — 2025", date: "15 июня 2025" },
  recentMatches: [
    { id: 1, player1: "Соколов", player2: "Кузнецова", score: "3:1", date: "12.04.2025" },
    { id: 2, player1: "Новиков", player2: "Попова",    score: "3:0", date: "12.04.2025" },
    { id: 3, player1: "Фёдоров", player2: "Орлова",   score: "2:3", date: "12.04.2025" },
  ],
  checklist: {
    visible: true,
    items: [
      { id: 1, label: "Добавьте состав участников", done: true },
      { id: 2, label: "Проверьте правила клуба",    done: true },
      { id: 3, label: "Настройте рейтинговую систему", done: false },
    ],
  },
};
