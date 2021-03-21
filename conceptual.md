### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  JWT stands for "JSON Web Token." JWTs are tokens used to provide authentication/authorization for web apps. They have three parts: a header, a payload, and a signature. The header contains metadata about the token, like what algorithm was used to sign it. The payload contains the data to be stored in the token, like a username.

- What is the signature portion of the JWT? What does it do?
  The signature portion of the JWT includes an encrypted version of the data from the header & payload and is "signed" with a secret key that enables the server to make sure that the JWT is coming from a trusted source. The secret key is required in order for the server to validate the token.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  Yes. The payload of a token in only encoded, not encrypted, and can be decoded without knowing the secret key used to sign the token.

- How can you implement authentication with a JWT? Describe how it works at a high level.
  Data from a request is used to generate a token on the server, which is signed with the secret key. The server sends the JWT along with its JSON response, and the client stores it. Then the client sends it to the server when it needs to make a request. The server then gets the token from the request and validates it before responding to the client.

- Compare and contrast unit, integration and end-to-end tests.
  Unit tests work on the level of one small piece of code. Integration tests look at how different pieces of code interact with one another. End-to-end tests test the entire flow of an application and are intended to imitate a holistic user experience.

- What is a mock? What are some things you would mock?
  Mocking is used in unit testing to imitate the behavior of something on which the code being tested depends. This is useful when there are complex dependencies at work that would be onerous to incorporate into the testing. For example, you could mock AJAX requests, reading/writing to files, or "impure" functions that return something unpredictable, like Math.random.

- What is continuous integration?
  Continous integration is the practice of merging in lots of small changes to a codebase rather than one large change all at once. This is advantageous for working on a team, as it helps keep everyone's copy of the codebase consistent. It is often used with automated testing to reject code that does not pass tests from being deployed.

- What is an environment variable and what are they used for?
  An environment variable is a variable that is set outside of an application by the operating system or other service that runs the program. They're used for environment-specific configuration needs like setting an application's execution mode to production or development or setting a secret key to be used for authentication.

- What is TDD? What are some benefits and drawbacks?
  TDD stands for "test-driven development," a process in which tests are written first in order to provide a kind of blueprint for how the code they are intended to test should work. Only code that is necessary to pass the tests should be written. There are three phases: red, when the tests are failing; green, when the code is passing tests; and a refactoring stage to optimize the code. Benefits: helps break down a project into discrete parts (which can also help make the code more modular), keeps development on track by forcing you to focus on one thing at a time, cuts what is not necessary, makes it easier to work with a team, and continuously tests code. Drawbacks: tests must be maintained as code is refactored, can slow down development, writing good tests is as difficult as writing good code, and the process can be highly tedious.

- What is the value of using JSONSchema for validation?
  Validating with JSONSchema allows request data to "fail fast" before bad or invalid data comes into contact with your database. It also eliminates the need to write elaborate code to check the incoming data, and is easy to set up and maintain.

- What are some ways to decide which code to test?
  Any code that is involved in a CRUD action with a database, involves authorization or authentication, is a good candidate for being tested.

- What are some differences between Web Sockets and HTTP?
  HTTP is stateless and requires making a request in order to get a response, but web sockets are stateful and stay connected. Websockets are often used for situations in which there are changes happening in the browser, like messages being sent back and forth between two users. HTTP is also comparatively heavyweight and verbose compared to web sockets, which are very lightweight.

- Did you prefer using Flask over Express? Why or why not (there is no right answer here --- we want to see how you think about technology)?
  It's hard to compare Flask and Express based on my experience with this course, since the way we used them is different. We never built a project with a significant front-end with Express, for instance, and with Flask we were using an ORM for database work instead of a SQL driver. That said, I preferred my experience with Flask overall, as it seemed more intuitive than Express and made it easy to create a front-end UI without installing extra libraries. I do appreciate Express's error handling, however.
