PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_number` integer NOT NULL,
	`customer_token` text NOT NULL,
	`name` text NOT NULL,
	`party_size` integer NOT NULL,
	`status` text DEFAULT 'WAITING' NOT NULL,
	`created_at` integer NOT NULL,
	`removed_at` integer,
	CONSTRAINT "party_size_positive" CHECK("__new_waitlist"."party_size" > 0)
);
--> statement-breakpoint
INSERT INTO `__new_waitlist`("id", "ticket_number", "customer_token", "name", "party_size", "status", "created_at", "removed_at") SELECT "id", "ticket_number", "customer_token", "name", "party_size", "status", "created_at", "removed_at" FROM `waitlist`;--> statement-breakpoint
DROP TABLE `waitlist`;--> statement-breakpoint
ALTER TABLE `__new_waitlist` RENAME TO `waitlist`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_ticket_number_unique` ON `waitlist` (`ticket_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_customer_token_unique` ON `waitlist` (`customer_token`);