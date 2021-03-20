Bugs

BUGS #1-2
JSON schema validation missing for routes

BUG #1:
routes/auth.js
POST /register
Fix:

- [x] Created validation schema for route, helpers/register.json
- [x] Implemented validation in route
- [x] Add tests

BUG #2:
routes/users.js
PATCH /:username
Fix:

- [x] Created validation schema for route, helpers/userUpdate.json
- [x] Implemented validation in route
- [x] Add tests

Fix for BUGS #1-2:

- [x] Installed jsonschema

BUG #3:
routes/user.js
GET / returns too much information about users; should only return basic info in this route
Fix:

- [x] Change SELECT statement in User.findAll to only return username, firstName, lastName
- [x] Add testing to check response data

BUG #4:
routes/user.js
PATCH/:username authorization is faulty. Currently denies access for correct user and only allows admin. This auth be moved into middleware that checks to ensure user is same user or is admin to improve scalability of code
Fix:

- [x] move auth logic from route to middleware/auth.js
- [x] replace requireAdmin with requireAdminOrCorrectUser in route

BUG #5:
middleware/auth.js

- authUser is decoding but not verifying JWT
  Fix:
  - [x] Verify token

BUG #6:
routes/auth.js
Not awaiting async function: User.authenticate in login route
Fix:

- [x] await User.authenticate

BUG #6:
Token should be sent in request authorization header, not request body
Fix:

- [x] Update middleware/auth.js authUser to check for token in header rather than body or query string
- [] Update tests for affected routes

---

Further Recommendations:

Only routes are being tested. Add testing for all files.
