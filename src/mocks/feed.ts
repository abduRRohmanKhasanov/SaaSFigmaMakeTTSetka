export type EventType = "Анонс" | "Встреча" | "Чемпион" | "Достижение";

export interface FeedEvent {
  id: number;
  type: EventType;
  title: string;
  time: string;
}

export const feedMock = {
  tournamentName: "Весенний кубок — 2025",
  tournamentDate: "12 апреля 2025",
  events: [
    { id: 1, type: "Чемпион" as EventType,     title: "Алексей Соколов стал чемпионом клуба", time: "19:45" },
    { id: 2, type: "Встреча" as EventType,      title: "Соколов — Кузнецова: 3:1 (11:8, 9:11, 11:7, 11:6)", time: "19:00" },
    { id: 3, type: "Встреча" as EventType,      title: "Новиков — Фёдоров: 3:0 (11:5, 11:9, 11:7)", time: "18:10" },
    { id: 4, type: "Достижение" as EventType,   title: "Мария Кузнецова: 5 побед подряд", time: "17:30" },
    { id: 5, type: "Встреча" as EventType,      title: "Кузнецова — Попова: 3:2 (11:9, 8:11, 11:6, 9:11, 11:8)", time: "16:50" },
    { id: 6, type: "Анонс" as EventType,        title: "Начало полуфинального раунда", time: "16:00" },
  ],
  pastEvents: [
    { id: 7, type: "Встреча" as EventType,  title: "Соколов — Новиков: 3:0 (11:7, 11:4, 11:9)", time: "14:30" },
    { id: 8, type: "Встреча" as EventType,  title: "Кузнецова — Волков: 3:1", time: "13:45" },
    { id: 9, type: "Анонс" as EventType,    title: "Турнир открыт. Состав: 12 игроков", time: "10:00" },
  ],
};

export const currentTournamentMock = {
  name: "Весенний кубок — 2025",
  date: "12 апреля 2025",
  status: "Завершён" as "Идёт" | "Завершён" | "Объявлен",
};

export const championMock = {
  playerId: 1,
  name: "Алексей Соколов",
  rating: 680,
};
