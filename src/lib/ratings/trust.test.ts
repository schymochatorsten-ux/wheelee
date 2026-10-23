import { describe, expect, it } from "vitest";
import {
  accountFactors,
  ageWeight,
  assessSpot,
  lastThreeGone,
  reportReasons,
  type VoteRecord,
} from "./trust";

const NOW = new Date("2026-10-23T12:00:00.000Z");

function monthsAgo(months: number): string {
  return new Date(NOW.getTime() - months * 30.4375 * 24 * 60 * 60 * 1000).toISOString();
}

function vote(
  spotId: string,
  accountId: string,
  v: "exists" | "gone",
  at = monthsAgo(0),
): VoteRecord {
  return { spotId, accountId, vote: v, at };
}

describe("ageWeight", () => {
  it("folgt den Stützstellen 0/6/12/24 Monate = 100/75/50/25 %", () => {
    expect(ageWeight(monthsAgo(0), NOW)).toBeCloseTo(1);
    expect(ageWeight(monthsAgo(6), NOW)).toBeCloseTo(0.75);
    expect(ageWeight(monthsAgo(12), NOW)).toBeCloseTo(0.5);
    expect(ageWeight(monthsAgo(24), NOW)).toBeCloseTo(0.25);
  });

  it("rechnet dazwischen linear", () => {
    expect(ageWeight(monthsAgo(3), NOW)).toBeCloseTo(0.875);
    expect(ageWeight(monthsAgo(9), NOW)).toBeCloseTo(0.625);
    expect(ageWeight(monthsAgo(18), NOW)).toBeCloseTo(0.375);
  });

  it("bleibt über zwei Jahre bei 25 % (Annahme, kein Verfall auf null)", () => {
    expect(ageWeight(monthsAgo(60), NOW)).toBeCloseTo(0.25);
  });

  it("zählt eine Stimme aus der Zukunft als frisch", () => {
    expect(ageWeight(monthsAgo(-1), NOW)).toBe(1);
  });
});

describe("lastThreeGone", () => {
  it("gilt bei drei „aufgehoben“ als jüngste Stimmen – trotz älterer Bestätigungen in der Überzahl", () => {
    const votes = [
      vote("s", "a", "exists", monthsAgo(20)),
      vote("s", "b", "exists", monthsAgo(19)),
      vote("s", "c", "exists", monthsAgo(18)),
      vote("s", "d", "exists", monthsAgo(17)),
      vote("s", "e", "gone", monthsAgo(3)),
      vote("s", "f", "gone", monthsAgo(2)),
      vote("s", "g", "gone", monthsAgo(1)),
    ];
    expect(lastThreeGone(votes)).toBe(true);
  });

  it("gilt nicht, wenn unter den letzten drei eine Bestätigung ist", () => {
    const votes = [
      vote("s", "a", "gone", monthsAgo(3)),
      vote("s", "b", "exists", monthsAgo(2)),
      vote("s", "c", "gone", monthsAgo(1)),
    ];
    expect(lastThreeGone(votes)).toBe(false);
  });

  it("gilt bei weniger als drei Stimmen nicht", () => {
    expect(lastThreeGone([vote("s", "a", "gone"), vote("s", "b", "gone")])).toBe(false);
  });

  it("meint immer drei verschiedene Konten (UNIQUE je Konto und Parkplatz)", () => {
    const votes = [
      vote("s", "a", "gone", monthsAgo(3)),
      vote("s", "b", "gone", monthsAgo(2)),
      vote("s", "c", "gone", monthsAgo(1)),
    ];
    // Die Tabelle erlaubt je Konto nur eine Zeile; die drei neuesten sind
    // damit zwangsläufig drei Konten.
    expect(new Set(votes.map((record) => record.accountId)).size).toBe(3);
    expect(lastThreeGone(votes)).toBe(true);
  });
});

describe("accountFactors", () => {
  /** Ein Konto „x“ stimmt auf `n` Parkplätzen mit zwei anderen überein oder nicht. */
  function spotsWith(n: number, xVote: "exists" | "gone"): VoteRecord[] {
    const out: VoteRecord[] = [];
    for (let i = 0; i < n; i++) {
      out.push(vote(`p${i}`, "x", xVote));
      out.push(vote(`p${i}`, "y", "exists"));
      out.push(vote(`p${i}`, "z", "exists"));
    }
    return out;
  }

  it("lässt den Faktor bei 1,0, solange zu wenige Parkplätze gezählt sind", () => {
    expect(accountFactors(spotsWith(4, "exists")).get("x")).toBeUndefined();
  });

  it("gibt volle Übereinstimmung den Faktor 2,0 und keinen höheren", () => {
    expect(accountFactors(spotsWith(5, "exists")).get("x")).toBe(2);
  });

  it("gibt dauernder Abweichung den Faktor 1,0 und keinen niedrigeren", () => {
    expect(accountFactors(spotsWith(5, "gone")).get("x")).toBe(1);
  });

  it("zählt Parkplätze mit weniger als drei Konten nicht", () => {
    const votes: VoteRecord[] = [];
    for (let i = 0; i < 8; i++) {
      votes.push(vote(`p${i}`, "x", "exists"), vote(`p${i}`, "y", "exists"));
    }
    expect(accountFactors(votes).size).toBe(0);
  });

  it("zählt keinen Gleichstand der anderen", () => {
    const votes: VoteRecord[] = [];
    for (let i = 0; i < 8; i++) {
      votes.push(vote(`p${i}`, "x", "exists"), vote(`p${i}`, "y", "exists"), vote(`p${i}`, "z", "gone"));
    }
    // x: andere = {exists, gone} → Gleichstand, nichts gezählt.
    expect(accountFactors(votes).get("x")).toBeUndefined();
  });
});

describe("assessSpot", () => {
  it("liefert rohe Zähler neben den gewichteten Summen", () => {
    const votes = [
      vote("s", "a", "gone", monthsAgo(0)),
      vote("s", "b", "exists", monthsAgo(12)),
      vote("s", "c", "exists", monthsAgo(24)),
    ];
    const result = assessSpot(votes, new Map(), NOW);
    expect(result.goneCount).toBe(1);
    expect(result.existsCount).toBe(2);
    expect(result.goneWeight).toBeCloseTo(1);
    expect(result.existsWeight).toBeCloseTo(0.75);
  });

  it("wendet den Konto-Faktor an", () => {
    const votes = [vote("s", "a", "gone")];
    expect(assessSpot(votes, new Map([["a", 1.5]]), NOW).goneWeight).toBeCloseTo(1.5);
  });
});

describe("reportReasons", () => {
  const base = { existsCount: 4, goneCount: 3, existsWeight: 2, goneWeight: 3, lastThreeGone: true };

  it("nennt beide Gründe, wenn beide zutreffen", () => {
    expect(reportReasons(base, 2)).toEqual(["lastThreeGone", "reports"]);
  });

  it("lässt die Mindestzahl-Auswahl unberührt", () => {
    expect(reportReasons({ ...base, lastThreeGone: false }, 5)).toEqual([]);
    expect(reportReasons({ ...base, lastThreeGone: false }, 3)).toEqual(["reports"]);
  });
});
