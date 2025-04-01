/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();

  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const items = data.products.map((product) => ({
      user_id: 1,
      item_name: product.title,
      description: product.description,
      quantity: product.stock,
    }));

    await knex("items").insert(items);
    console.log("Items seeded successfully.");
  } catch (error) {
    console.error("Error seeding items:", error);
  }
};
