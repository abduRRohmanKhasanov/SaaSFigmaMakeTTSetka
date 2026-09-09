export type Level = "L1" | "L2" | "L3";

export interface Player {
  id: number;
  name: string;
  rating: number;
  level: Level;
  birthDate: string;
  wins: number;
  losses: number;
  achievements: string[];
}

export const playersMock: Player[] = [
  { id: 1, name: "Алексей Соколов",   rating: 680, level: "L3", birthDate: "1990-03-15", wins: 42, losses: 8,  achievements: ["Чемпион клуба", "5 побед подряд", "Лучший сезон"] },
  { id: 2, name: "Мария Кузнецова",   rating: 615, level: "L3", birthDate: "1995-07-22", wins: 35, losses: 12, achievements: ["Финалист", "Лучшая подача"] },
  { id: 3, name: "Дмитрий Новиков",   rating: 540, level: "L2", birthDate: "1988-11-03", wins: 28, losses: 18, achievements: ["10 побед"] },
  { id: 4, name: "Анна Попова",       rating: 495, level: "L2", birthDate: "1998-04-12", wins: 22, losses: 15, achievements: ["Лучший дебют"] },
  { id: 5, name: "Игорь Фёдоров",     rating: 460, level: "L2", birthDate: "1993-09-28", wins: 19, losses: 20, achievements: [] },
  { id: 6, name: "Светлана Орлова",   rating: 420, level: "L2", birthDate: "2001-01-17", wins: 15, losses: 18, achievements: ["Лучший новичок"] },
  { id: 7, name: "Пётр Волков",       rating: 385, level: "L1", birthDate: "2000-06-05", wins: 12, losses: 22, achievements: [] },
  { id: 8, name: "Елена Морозова",    rating: 340, level: "L1", birthDate: "2002-08-19", wins: 9,  losses: 25, achievements: [] },
  { id: 9, name: "Андрей Лебедев",    rating: 295, level: "L1", birthDate: "2003-02-14", wins: 7,  losses: 28, achievements: [] },
  { id: 10, name: "Ольга Смирнова",   rating: 250, level: "L1", birthDate: "2004-12-01", wins: 5,  losses: 30, achievements: [] },
  { id: 11, name: "Виктор Козлов",    rating: 210, level: "L1", birthDate: "1999-05-23", wins: 4,  losses: 22, achievements: [] },
  { id: 12, name: "Наталья Павлова",  rating: 170, level: "L1", birthDate: "2005-03-08", wins: 2,  losses: 18, achievements: [] },
];
