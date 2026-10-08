"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./customer.module.css";

type CustomerStatus = {
  ticketNumber: number;
  name: string;
  partySize: number;
  partiesAhead: number;
};

const TOKEN_KEY = "waitlist_customer_token";

export default function CustomerPage() {
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState("");
  const [status, setStatus] = useState<CustomerStatus | null>(null);
  const [customerToken, setCustomerToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      setCustomerToken(token);
      loadStatus(token);
    }
  }, []);

  async function loadStatus(token: string) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/customer/waitlist/${token}`
      );

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem(TOKEN_KEY);
        setCustomerToken(null);
        setStatus(null);
        setError(data.error ?? "Waitlist entry not found");
        return;
      }

      setStatus(data);
    } catch {
      setError("Failed to load waitlist position");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/customer/waitlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            partySize: Number(partySize),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to join waitlist");
        return;
      }

      localStorage.setItem(
        TOKEN_KEY,
        data.customerToken
      );

      setCustomerToken(data.customerToken);

      await loadStatus(data.customerToken);

      setName("");
      setPartySize("");
    } catch {
      setError("Failed to join waitlist");
    } finally {
      setLoading(false);
    }
  }

  function handleRefresh() {
    if (customerToken) {
      loadStatus(customerToken);
    }
  }

  function handleLeave() {
    localStorage.removeItem(TOKEN_KEY);
    setCustomerToken(null);
    setStatus(null);
    setError("");
  }

  if (status) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>
          Restaurant Waitlist
        </h1>

        <p className={styles.subtitle}>
          Welcome, <strong>{status.name}</strong>
        </p>

        <section className={styles.statusCard}>
          <p className={styles.statusRow}>
            <strong>Ticket:</strong>{" "}
            {status.ticketNumber}
          </p>

          <p className={styles.statusRow}>
            <strong>Party size:</strong>{" "}
            {status.partySize}
          </p>

          <p className={styles.statusRow}>
            <strong>Parties ahead:</strong>{" "}
            {status.partiesAhead}
          </p>
        </section>

        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Refreshing..." : "Refresh position"}
        </button>

        <button
          type="button"
          onClick={handleLeave}
          className={styles.secondaryButton}
        >
          Clear this device
        </button>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        Restaurant Waitlist
      </h1>

      <p className={styles.subtitle}>
        Join the waitlist
      </p>

      <form
        onSubmit={handleJoin}
        className={styles.form}
      >
        <div className={styles.field}>
          <label
            htmlFor="name"
            className={styles.label}
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label
            htmlFor="partySize"
            className={styles.label}
          >
            Party size
          </label>

          <input
            id="partySize"
            type="number"
            min="1"
            step="1"
            value={partySize}
            onChange={(event) =>
              setPartySize(event.target.value)
            }
            required
            className={styles.input}
          />
        </div>

        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Joining..." : "Join waitlist"}
        </button>
      </form>
    </main>
  );
}
