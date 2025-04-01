/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();

    const users = data.users.map((user) => ({
      first_name: user.firstName,
      last_name: user.lastName,
      username: user.username,
      password: user.password,
    }));

    await knex("users").insert(users);
    console.log("Users seeded successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
