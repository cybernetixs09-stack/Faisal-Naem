"use client";

import { useEffect, useState } from "react";
import styles from "./staff.module.css";

type WaitlistParty = {
  ticketNumber: number;
  name: string;
  partySize: number;
  createdAt: string;
};

const STAFF_SECRET = "waitlist-staff-9f7c2a1d8e4b6f3a";

export default function StaffPage() {
  const [parties, setParties] = useState<WaitlistParty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadWaitlist() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/staff/waitlist", {
        headers: {
          "x-staff-secret": STAFF_SECRET,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized. Staff access is required.");
        } else {
          setError(
            data.error ?? "Failed to load waitlist"
          );
        }

        return;
      }

      setParties(data);
    } catch {
      setError("Failed to load waitlist");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(ticketNumber: number) {
    setError("");

    try {
      const response = await fetch(
        `/api/staff/waitlist/${ticketNumber}`,
        {
          method: "DELETE",
          headers: {
            "x-staff-secret": STAFF_SECRET,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError(
            "Unauthorized. Staff access is required."
          );
        } else {
          setError(
            data.error ?? "Failed to remove party"
          );
        }

        return;
      }

      await loadWaitlist();
    } catch {
      setError("Failed to remove party");
    }
  }

  useEffect(() => {
    loadWaitlist();
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        Staff Waitlist
      </h1>

      <p className={styles.subtitle}>
        Manage the current waiting parties.
      </p>

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={loadWaitlist}
        disabled={loading}
        className={styles.refreshButton}
      >
        {loading ? "Loading..." : "Refresh queue"}
      </button>

      {!loading && parties.length === 0 && !error && (
        <p className={styles.empty}>
          No parties are currently waiting.
        </p>
      )}

      {parties.length > 0 && (
        <section className={styles.queue}>
          {parties.map((party) => (
            <article
              key={party.ticketNumber}
              className={styles.card}
            >
              <div>
                <p className={styles.ticket}>
                  Ticket #{party.ticketNumber}
                </p>

                <p className={styles.name}>
                  {party.name}
                </p>

                <p className={styles.partySize}>
                  Party size: {party.partySize}
                </p>

                <p className={styles.createdAt}>
                  Joined:{" "}
                  {new Date(
                    party.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleRemove(party.ticketNumber)
                }
                className={styles.removeButton}
              >
                Remove
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}