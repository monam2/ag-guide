## Scenario
We need to add a "Retry Failed Subscription Payment" API to a SaaS platform based on Next.js 16 (App Router) + TypeScript + Supabase (PostgreSQL).

## Task
Implement an API to retry failed subscription payments.

Create the endpoint `POST /api/payments/retry`.

It should accept a `subscriptionId` as input, attempt the retry, and return the result.

## Context

### Project Stack
- Next.js 16
- TypeScript
- Supabase

### Payment Gateway
- Toss Payments

### Existing Tables
- `subscriptions(id, user_id, status, next_billing_at, last_payment_id)`
- `payments(id, subscription_id, status, amount, provider, provider_payment_key, created_at)`

### State Rules
- `subscriptions.status`: `active | past_due | canceled`
- `payments.status`: `paid | failed | pending`

### Security Rules
- Users can only retry their own subscriptions.
- Service keys must only be used on the server side.

### Transaction Requirements
Atomically update both `payments` and `subscriptions` tables upon successful payment approval.

## Reference
Follow the code style, error formatting, and utility structure of the following files:
- `app/api/payments/create/route.ts`
- `lib/api/response.ts`
- `lib/supabase/server.ts`
- `lib/payments/toss-client.ts`

## Evaluate
Self-check against the following criteria and summarize the results:
- Functional Accuracy: Are only failed payments retried? Is the status updated correctly upon success?
- Security: Is there any missing authentication or authorization?
- Stability: Are external API failures, timeouts, and duplicate requests handled?
- Code Quality: Is it consistent with existing code conventions?
- Testing: Are minimum unit tests and API integration test cases included?

## Output
Please output the results in the following format:
1. List of changed files
2. Summary of key changes for each file (1-2 lines)
3. Full code
4. Test code
5. Local execution/verification commands
6. Remaining risks (if any)

## Iterate
After generating the first result, apply the following improvements for a second iteration:
- Modify error response messages to be user-friendly.
- Add duplicate retry prevention (idempotency key).
- Apply PII masking to payment API response logging.
