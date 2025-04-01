/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();

  try {
    console.log("Fetching products from DummyJSON...");
    const response = await fetch("https://dummyjson.com/products?limit=0");
    const data = await response.json();
    console.log("Fetched data:", data);
    if (!data.products || data.products.length === 0) {
      console.log("No products found in the API response.");
      return;
    }
    console.log(`Fetched ${data.products.length} products.`);

    const userIds = await knex("users").pluck("id");
    console.log("Available user IDs:", userIds);

    const items = data.products.map((product) => ({
      user_id: userIds[Math.floor(Math.random() * userIds.length)],
      item_name: product.title,
      description: product.description,
      quantity: product.stock,
    }));

    console.log("Inserting", items.length, "items into the database...");
    await knex("items").insert(items);
    console.log("Items seeded successfully.");
  } catch (error) {
    console.error("Error seeding items:", error);
  }
};
