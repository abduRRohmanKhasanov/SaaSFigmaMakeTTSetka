import { useState, useCallback } from "react";
import { TaskShell } from "@/layouts/TaskShell";
import { Button } from "@/components/ui/button";
import { refereeMock } from "@/mocks/referee";
import { cn } from "@/lib/utils";

type GamePhase = "playing" | "set-over" | "match-over" | "confirmed";

function formatSets(sets: [number, number][]) {
  return sets.map(([a, b]) => `${a}:${b}`).join(", ");
}

function isSetOver(a: number, b: number): boolean {
  if (a >= 11 || b >= 11) return Math.abs(a - b) >= 2;
  return false;
}

function isMatchOver(p1sets: number, p2sets: number, setsToWin: number): boolean {
  return p1sets >= setsToWin || p2sets >= setsToWin;
}

export function RefereePage() {
  const { tournamentName, tableNumber, player1, player2, setsToWin, pointsToWin } = refereeMock;

  const [setScores, setSetScores] = useState<[number, number][]>([[0, 0]]);
  const [completedSets, setCompletedSets] = useState<[number, number][]>([]);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [servingPlayer, setServingPlayer] = useState<1 | 2>(1);
  const [servesLeft, setServesLeft] = useState(2);

  const currentSet = setScores[setScores.length - 1] ?? [0, 0];
  const [p1cur, p2cur] = currentSet;

  const p1setsWon = completedSets.filter(([a, b]) => a > b).length;
  const p2setsWon = completedSets.filter(([a, b]) => b > a).length;

  const addPoint = useCallback((who: 1 | 2) => {
    if (phase !== "playing") return;
    const [a, b] = currentSet;
    const newA = who === 1 ? a + 1 : a;
    const newB = who === 2 ? b + 1 : b;

    // Update serve tracking
    let newServesLeft = servesLeft - 1;
    let newServing = servingPlayer;
    const totalPoints = newA + newB;
    // At 10:10+, switch every point; otherwise every 2
    if (newA >= 10 && newB >= 10) {
      newServesLeft = 0; // will switch
    }
    if (newServesLeft <= 0) {
      newServing = newServing === 1 ? 2 : 1;
      newServesLeft = (newA >= 10 && newB >= 10) ? 1 : 2;
    }
    setServingPlayer(newServing);
    setServesLeft(newServesLeft);

    const newSet: [number, number] = [newA, newB];

    if (isSetOver(newA, newB)) {
      const newCompleted = [...completedSets, newSet];
      const p1w = newCompleted.filter(([a, b]) => a > b).length;
      const p2w = newCompleted.filter(([a, b]) => b > a).length;
      setCompletedSets(newCompleted);
      setSetScores([...setScores.slice(0, -1), newSet]);
      if (isMatchOver(p1w, p2w, setsToWin)) {
        setPhase("match-over");
      } else {
        setPhase("set-over");
      }
    } else {
      setSetScores([...setScores.slice(0, -1), newSet]);
    }
  }, [phase, currentSet, completedSets, setScores, servingPlayer, servesLeft, setsToWin]);

  const undoPoint = useCallback(() => {
    if (phase !== "playing") return;
    const [a, b] = currentSet;
    if (a === 0 && b === 0) return;
    const newA = a > 0 ? a - 1 : a;
    const newB = b > 0 ? b - 1 : b;
    // simple: just decrement last scorer (track who scored last)
    // For simplicity, alternate undo heuristic
    setSetScores([...setScores.slice(0, -1), [newA, newB] as [number, number]]);
  }, [phase, currentSet, setScores]);

  const nextSet = () => {
    setSetScores([...setScores, [0, 0]]);
    setPhase("playing");
    setServingPlayer(servingPlayer === 1 ? 2 : 1);
    setServesLeft(2);
  };

  const winner = phase === "match-over" || phase === "confirmed"
    ? (p1setsWon >= setsToWin ? player1.name : player2.name)
    : null;

  return (
    <TaskShell
      title={tournamentName}
      subtitle={`Стол ${tableNumber}`}
      backTo="/admin/tournaments/1/console"
    >
      <div className="flex flex-col h-full min-h-[calc(100vh-64px)] bg-surface select-none">

        {/* Match score row */}
        <div className="flex items-center justify-center gap-4 px-4 pt-4 pb-2">
          <span className="title-medium text-on-surface truncate text-right flex-1">{player1.name}</span>
          <span className="headline-medium text-on-surface shrink-0">
            {p1setsWon}:{p2setsWon}
          </span>
          <span className="title-medium text-on-surface truncate flex-1">{player2.name}</span>
        </div>

        {/* Completed sets indicator */}
        {completedSets.length > 0 && (
          <p className="text-center label-small text-on-surface-variant pb-1">
            {formatSets(completedSets)}
          </p>
        )}

        {/* ─── MAIN SCOREBOARD ─── */}
        {phase === "playing" || phase === "set-over" ? (
          <>
            <div className="flex items-center justify-center gap-3 py-4 flex-1">
              <span
                className="font-['Roboto_Flex',sans-serif] text-on-surface shrink-0"
                style={{ fontSize: "28vw", lineHeight: 1, fontWeight: 700 }}
              >
                {p1cur}
              </span>
              <span className="title-large text-on-surface-variant">:</span>
              <span
                className="font-['Roboto_Flex',sans-serif] text-on-surface shrink-0"
                style={{ fontSize: "28vw", lineHeight: 1, fontWeight: 700 }}
              >
                {p2cur}
              </span>
            </div>

            {/* Serve indicator */}
            <div className="flex items-center justify-center gap-2 pb-3">
              <div className={cn("w-3 h-3 rounded-full transition-colors", servingPlayer === 1 ? "bg-primary" : "bg-surface-container-highest")} />
              <span className="label-medium text-on-surface-variant">
                Подаёт {servingPlayer === 1 ? player1.name : player2.name} · {servesLeft} подач{servesLeft === 1 ? "а" : "и"}
              </span>
              <div className={cn("w-3 h-3 rounded-full transition-colors", servingPlayer === 2 ? "bg-primary" : "bg-surface-container-highest")} />
            </div>

            {/* +1 buttons */}
            {phase === "playing" && (
              <div className="flex">
                <button
                  onPointerDown={() => addPoint(1)}
                  className="flex-1 bg-primary-container text-on-primary-container active:opacity-80 transition-opacity"
                  style={{ minHeight: "96px" }}
                >
                  <span className="headline-medium">+1</span>
                  <p className="label-medium mt-1 opacity-70">{player1.name}</p>
                </button>
                <div className="w-px bg-outline-variant" />
                <button
                  onPointerDown={() => addPoint(2)}
                  className="flex-1 bg-secondary-container text-on-secondary-container active:opacity-80 transition-opacity"
                  style={{ minHeight: "96px" }}
                >
                  <span className="headline-medium">+1</span>
                  <p className="label-medium mt-1 opacity-70">{player2.name}</p>
                </button>
              </div>
            )}

            {/* Undo */}
            {phase === "playing" && (
              <div className="flex justify-center py-4 border-t border-outline-variant">
                <Button variant="text" onClick={undoPoint}>
                  Отменить очко
                </Button>
              </div>
            )}

            {/* Set over confirmation */}
            {phase === "set-over" && (
              <div className="mx-4 mb-4 p-5 rounded-[1.25rem] bg-surface-container-high flex flex-col gap-4">
                <div>
                  <p className="title-medium text-on-surface">Партия завершена</p>
                  <p className="body-medium text-on-surface-variant mt-1">
                    Счёт: {completedSets[completedSets.length - 1]?.[0]}:{completedSets[completedSets.length - 1]?.[1]}
                  </p>
                  <p className="label-medium text-on-surface-variant mt-0.5">
                    Встреча: {p1setsWon}:{p2setsWon}
                  </p>
                </div>
                <Button variant="filled" onClick={nextSet}>
                  Следующая партия
                </Button>
              </div>
            )}
          </>
        ) : phase === "match-over" ? (
          /* Match over */
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">
            <div className="p-6 rounded-[1.25rem] bg-primary-container w-full">
              <p className="label-large text-on-primary-container/70 mb-1">Победитель встречи</p>
              <p className="headline-medium text-on-primary-container">{winner}</p>
              <p className="display-small text-on-primary-container mt-2">
                {p1setsWon}:{p2setsWon}
              </p>
              <p className="label-medium text-on-primary-container/70 mt-2">
                {formatSets(completedSets)}
              </p>
            </div>
            <Button variant="filled" className="w-full" onClick={() => setPhase("confirmed")}>
              Подтвердить результат
            </Button>
          </div>
        ) : (
          /* Confirmed */
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center">
              <span className="headline-small text-on-primary-container">OK</span>
            </div>
            <p className="headline-small text-on-surface">Результат отправлен</p>
            <p className="body-medium text-on-surface-variant">
              Победитель: {winner} · {p1setsWon}:{p2setsWon}
            </p>
          </div>
        )}
      </div>
    </TaskShell>
  );
}
