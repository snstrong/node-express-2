Bugs

BUGS #1-2
JSON schema validation missing
Vulnerabilities:

- [] BUG #1:
  routes/auth.js
  POST /register

- [] BUG #2:
  routes/users.js
  PATCH /:username

Fix:

- [x] Installed jsonschema
- [] Created validation schemas for each route
- [] Implemented validation in each route

BUG #3:
No testing for user model

BUG #4:
routes/user.js

- GET / returns too much information about users - should only return basic info

BUG #5:
routes/user.js

- PATCH/:username has incorrect auth; only admin can access, but should be admin or correct user

BUG #6:
middleware/auth.js

- authUser is decoding but not verifying JWT
