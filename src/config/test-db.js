//require("dotenv").config({ path: "../../.env" });
const pool = require("./postgres");

//console.log("HOST:", process.env.PG_HOST); // debug

(async () => {
    try{
        const res = await pool.query("SELECT NOW()");
        console.log("DB OK", res.rows);
    }catch (err){
        console.error("DB ERROR", err);
    }
})();