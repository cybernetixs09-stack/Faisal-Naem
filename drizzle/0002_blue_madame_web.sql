PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_waitlist` (
	`ticket_number` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text NOT NULL,
	`customer_token` text NOT NULL,
	`name` text NOT NULL,
	`party_size` integer NOT NULL,
	`status` text DEFAULT 'WAITING' NOT NULL,
	`created_at` integer NOT NULL,
	`removed_at` integer,
	CONSTRAINT "party_size_positive" CHECK("__new_waitlist"."party_size" > 0)
);
--> statement-breakpoint
INSERT INTO `__new_waitlist`("ticket_number", "id", "customer_token", "name", "party_size", "status", "created_at", "removed_at") SELECT "ticket_number", "id", "customer_token", "name", "party_size", "status", "created_at", "removed_at" FROM `waitlist`;--> statement-breakpoint
DROP TABLE `waitlist`;--> statement-breakpoint
ALTER TABLE `__new_waitlist` RENAME TO `waitlist`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_id_unique` ON `waitlist` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_customer_token_unique` ON `waitlist` (`customer_token`);