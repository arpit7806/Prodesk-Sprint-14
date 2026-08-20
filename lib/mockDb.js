// In-memory user store for the walking skeleton.
// Resets on server restart - this is intentional for an MVP auth demo.
// Swap for a real database (Postgres/Mongo/etc.) once the architecture is proven.

let users = [];

export function findUser(email, password) {
  return users.find((u) => u.email === email && u.password === password);
}

export function userExists(email) {
  return users.some((u) => u.email === email);
}

export function createUser({ name, email, password }) {
  const user = { id: String(users.length + 1), name, email, password };
  users.push(user);
  return user;
}
