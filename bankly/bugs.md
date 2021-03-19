Bugs

BUGS #1-2
JSON schema validation missing for routes

BUG #1:
routes/auth.js
POST /register
Fix:

- [x] Created validation schema for route, helpers/register.json
- [x] Implemented validation in route
- [] Add tests

BUG #2:
routes/users.js
PATCH /:username
Fix:

- [x] Created validation schema for route, helpers/userUpdate.json
- [x] Implemented validation in route
- [] Add tests

Fix for BUGS #1-2:

- [x] Installed jsonschema

BUG #3:
No testing for user model

BUG #4:
routes/user.js
GET / returns too much information about users; should only return basic info in this route

BUG #5:
routes/user.js
PATCH/:username authentication for correct user should be moved into middleware that checks to ensure user is same user or is admin; will improve scalability of code; currently fails if not admin (actually fails if admin, too)

BUG #6:
middleware/auth.js

- authUser is decoding but not verifying JWT
  Fix:
  - [x] Verify token

BUG #7:
should send token in authorization header, not request body

BUG #8:
routes/auth.js
Not awaiting async function: User.authenticate in login route
Fix:

- [x] await User.authenticate
