const pool = require("../config/postgres");
const { castObject } = require("../models/user.model");

const createUserWithLog = async (name, email) => {
  const client = await pool.connect();

  try{
      await client.query("BEGIN");

      const userResult = await client.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]
      )

      const user = userResult.rows[0];

      await client.query(
        "INSERT INTO logs (message) VALUES ($1)",[`Created user ${user.id}`]
      );

      await client.query("COMMIT");

      return user;
  }
  catch (err){
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}


const createUserSQL = async (name, email) => {

  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]
  );
  return result.rows[0];
};

const getUsersSQL = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

const updateUserSQL = async (name, email, id) => {
    const result = await pool.query(
      "UPDATE users set name = $1, email = $2 where id = $3 RETURNING *",[name, email, id]
  );
  return result.rows[0];
};

const deleteUserSQL = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1", [id]
  );
  return result.rows[0];
}

module.exports = {
    createUserSQL, getUsersSQL, updateUserSQL, deleteUserSQL, createUserWithLog
}