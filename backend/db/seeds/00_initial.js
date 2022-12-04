const bcrypt = require("bcrypt");
const orderedTableNames = require("../../src/constants/orderedTableNames");
const tableNames = require("../../src/constants/tableNames");
const crypto = require("crypto");
const Knex = require("knex");
const countries = require("../../src/constants/country");

/**
 * @param {Knex} knex
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await orderedTableNames.reduce(async (promise, table_name) => {
    await promise;
    console.log("clearing", table_name);
    return knex(table_name).del();
  }, Promise.resolve());

  //Insert new data
  const password = crypto.randomBytes(20).toString("hex");
  const user = {
    email: "adrianscorus14@gmail.com",
    name: "Adrian",
    password: await bcrypt.hash(password, 12),
  };
  [createdUser] = await knex(tableNames.user).insert(user).returning("*");
  console.log(
    "User created",
    {
      password,
    },
    createdUser
  );
  await knex(tableNames.country).insert(countries);
  await knex(tableNames.state).insert([
    {
      name: "CO",
    },
  ]);
};
