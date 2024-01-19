# AWS SES

Using the TypeScript AWS SES SDK.

Create the SES identity:

```sh
# Get the DNS records using the Console
aws sesv2 create-email-identity --email-identity "<your domain>"
```

Create the `.env` and set the variables:

```cp
cp sample.env .env
```

Run the code:

```sh
npm i
npm run dev
```
