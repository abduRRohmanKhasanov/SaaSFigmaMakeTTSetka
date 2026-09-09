export type TournamentStatus = "Черновик" | "Объявлен" | "Идёт" | "Завершён";
export type TournamentFormat = "round-robin" | "olympic" | "group+playoff";

export interface Match {
  id: number;
  player1Id: number;
  player2Id: number;
  player1Name: string;
  player2Name: string;
  sets: [number, number][];
  winnerId: number | null;
  date: string;
}

export interface Tournament {
  id: number;
  name: string;
  date: string;
  status: TournamentStatus;
  format: TournamentFormat;
  participantIds: number[];
  matches: Match[];
  championId: number | null;
}

export const tournamentsMock: Tournament[] = [
  {
    id: 1,
    name: "Весенний кубок — 2025",
    date: "12 апреля 2025",
    status: "Завершён",
    format: "round-robin",
    participantIds: [1, 2, 3, 4, 5, 6],
    championId: 1,
    matches: [
      { id: 1, player1Id: 1, player2Id: 2, player1Name: "Соколов", player2Name: "Кузнецова", sets: [[11,8],[9,11],[11,7],[11,6]], winnerId: 1, date: "12.04.2025" },
      { id: 2, player1Id: 3, player2Id: 4, player1Name: "Новиков",  player2Name: "Попова",    sets: [[11,5],[11,9],[11,7]], winnerId: 3, date: "12.04.2025" },
      { id: 3, player1Id: 2, player2Id: 4, player1Name: "Кузнецова",player2Name: "Попова",    sets: [[11,9],[8,11],[11,6],[9,11],[11,8]], winnerId: 2, date: "12.04.2025" },
      { id: 4, player1Id: 1, player2Id: 3, player1Name: "Соколов",  player2Name: "Новиков",   sets: [[11,7],[11,4],[11,9]], winnerId: 1, date: "12.04.2025" },
    ],
  },
  {
    id: 2,
    name: "Летний чемпионат — 2025",
    date: "15 июня 2025",
    status: "Объявлен",
    format: "olympic",
    participantIds: [1, 2, 3, 4, 5, 6, 7, 8],
    championId: null,
    matches: [],
  },
  {
    id: 3,
    name: "Новогодний турнир — 2024",
    date: "28 декабря 2024",
    status: "Завершён",
    format: "round-robin",
    participantIds: [1, 2, 3, 5, 7],
    championId: 2,
    matches: [
      { id: 10, player1Id: 1, player2Id: 2, player1Name: "Соколов", player2Name: "Кузнецова", sets: [[9,11],[11,9],[8,11],[11,9],[9,11]], winnerId: 2, date: "28.12.2024" },
    ],
  },
];
