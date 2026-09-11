# Korecome Comprehensive College — Result Management System

This project contains the public school website plus a complete Node.js + Express + MySQL result-management portal.

## What is included

- Secure administrator login with signed HttpOnly cookie sessions
- Dashboard statistics and quick actions
- Student registration, editing, activation and deactivation
- Full class management (list, add, edit, delete when unused)
- Full subject management (list, add, edit, delete when unused)
- Academic-session management
- Bulk result entry for CA /40 and Exam /60
- Automatic total, grade and remark calculation
- Publish / unpublish controls
- Private result PIN generation, replacement, enable/disable and deletion
- Public result checker by Admission Number + PIN + Session + Term
- Printable student result sheet
- Responsive admin interface for desktop, tablet and mobile

## 1. Requirements

Install:

- Node.js 18 or newer
- MySQL 8.x (MySQL Workbench is fine)

## 2. Create the database

Open MySQL Workbench, open `database/schema.sql`, and run the full script.

The included application and schema use the database name:

`korecome_results`

If you already use another database name, set that exact name in `.env` as `DB_NAME`.

## 3. Create `.env`

Copy `.env.example` to a new file named `.env` in the same folder as `server.js`.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=korecome_results
SESSION_SECRET=REPLACE_WITH_A_LONG_RANDOM_SECRET
ADMIN_USERNAME=admin
ADMIN_PASSWORD=CHANGE_THIS_PASSWORD
NODE_ENV=development
```

Do not commit the real `.env` file to a public repository.

## 4. Install dependencies

From this `v4` folder:

```powershell
npm install
```

## 5. Start the website

```powershell
node server.js
```

Expected console output includes:

```text
Database connection successful.
Korecome website running on http://localhost:3000
Admin dashboard: http://localhost:3000/admin/
Class API loaded: GET /api/admin/classes
Subject API loaded: GET /api/admin/subjects
```

## 6. Open the pages

Public website:

`http://localhost:3000`

Result checker:

`http://localhost:3000/results.html`

Administrator portal:

`http://localhost:3000/admin/`

## Important database note

The server and `database/schema.sql` in this package are designed to work together. If your current MySQL database was created from an older/different result-system schema, field names may not match. For a clean installation, create/import `korecome_results` using this package's `database/schema.sql` and point `.env` to it.

## Recommended first-time workflow

1. Log into the administrator portal.
2. Confirm Classes and Subjects.
3. Add or activate the academic session you want to use.
4. Register students.
5. Enter their results.
6. Save and publish the result.
7. Generate a PIN for the same student/session/term.
8. Test the PIN on the public result checker.

## Security before deployment

Before hosting publicly:

- Replace `SESSION_SECRET` with a long random secret.
- Change the administrator password.
- Use HTTPS (`NODE_ENV=production` enables Secure cookies).
- Use a dedicated MySQL user instead of the root account.
- Keep `.env` private.
- Back up the database regularly.
