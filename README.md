# AniVerseX Mini Project

AniVerseX is a mini project that combines the web programming lab experiments into a single anime recommendation and review application.

## Project Theme

- Website name: `AniVerseX`
- Domain: `Anime Recommendations and Reviews`

## Module Structure

- `frontend/html-js/`
  Core HTML, CSS, and JavaScript pages for form design, validation, events, and objects.
- `frontend/jquery-ajax/`
  jQuery and AJAX demo for dynamic anime loading using GET and POST.
- `frontend/react-app/`
  React-based anime listing and review UI.
- `backend-node/`
  Node.js and Express backend for API-based anime management.
- `backend-springboot/`
  Spring Boot MVC CRUD layer with MySQL-ready entity and JSP views.
- `xml-module/`
  XML file processing using DOM parsing.
- `docs/`
  Experiment mapping and mini project explanation.

## Experiment Coverage

1. Client-side form design and validation
2. GET and POST
3. JavaScript events and objects
4. jQuery and AJAX
5. React application
6. Spring Boot MVC CRUD with MySQL
7. Multi-tier application using Node.js and Express
8. XML DOM processing

## Suggested Demo Flow

1. Open `frontend/html-js/home.html`
2. Show form validation in `frontend/html-js/registration.html`
3. Show events, objects, and review management in `frontend/html-js/index.html`
4. Start the Node backend and demonstrate live GET and POST in `frontend/jquery-ajax/index.html`
5. Show the React UI in `frontend/react-app/index.html`
6. Start the Spring Boot app and demonstrate create, list, edit, and delete in `/anime/list`
7. Show XML parsing in `xml-module/viewer.html`

## How To Run

### Node.js API

1. Open `backend-node/`
2. Run `npm install`
3. Run `npm run dev`
4. Open `frontend/jquery-ajax/index.html`

The Node API listens on `http://localhost:5000/api/anime`.
If MongoDB is not running, the backend falls back to in-memory demo data so the AJAX page can still work during viva.

### Spring Boot MVC + MySQL

1. Create the database using `backend-springboot/database/aniversex.sql`
2. Update MySQL username and password in `backend-springboot/src/main/resources/application.properties`
3. Run the Spring Boot project
4. Open `http://localhost:8080/anime/list`

### Frontend Pages

- `frontend/html-js/home.html`
- `frontend/html-js/registration.html`
- `frontend/html-js/index.html`
- `frontend/react-app/index.html`
- `xml-module/viewer.html`

## Notes

- The project is intentionally modular so each syllabus experiment is visible during review or viva.
- Spring Boot is the main academic backend.
- Node.js is kept as a separate multi-tier API module.
- The jQuery page now performs real GET and POST requests against the Node backend.
