CREATE TABLE `waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_number` integer NOT NULL,
	`customer_token` text NOT NULL,
	`name` text NOT NULL,
	`party_size` integer NOT NULL,
	`status` text DEFAULT 'WAITING' NOT NULL,
	`created_at` integer NOT NULL,
	`removed_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_ticket_number_unique` ON `waitlist` (`ticket_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_customer_token_unique` ON `waitlist` (`customer_token`);