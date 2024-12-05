import mysql, { RowDataPacket } from "npm:mysql2@^2.3.3/promise";
import "jsr:@std/dotenv/load";

const connection = await mysql.createConnection({
  host: Deno.env.get("DB_HOST"),
  user: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
  database: Deno.env.get("DB"),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-age": "86400",
};

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Handle OPTIONS request (CORS preflight)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (url.pathname === "/register") {
    if (req.method === "POST") {
      try {
        const body = await req.json();
        // console.log("Received body:", body);

        const { fname, lname, email, address, city, region, postal, password, phone } = body;

        await connection.execute(
          `INSERT INTO user_accounts (fname, lname, email, address, city, region, postal, password, phone) VALUES (?,?,?,?,?,?,?,?,?)`,
          [fname, lname, email, address, city, region, postal, password, phone],
        );

        return new Response(
          JSON.stringify({ message: "User registered successfully!" }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          },
        );
      } catch (error) {
        // console.error("Error inserting into database:", error);
        return new Response(
          JSON.stringify({ message: "Error inserting data" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          },
        );
      }
    } else {
      // console.log("method:", req.method);
      return new Response("Method Not Allowed", { status: 405 });
    }
  }

  if (url.pathname === "/getUserIDByEmail") {
    if (req.method === "GET") {
      try {
        const urlParams = new URLSearchParams(url.search); // For GET parameters
        const email = urlParams.get("email");

        if (!email) {
          return new Response(
            JSON.stringify({ message: "Email parameter is missing" }),
            { status: 400, headers: corsHeaders },
          );
        }

        const [rows] = await connection.execute<RowDataPacket[]>(
          `SELECT id FROM user_accounts WHERE email = ? LIMIT 1`,
          [email],
        );

        if (rows.length === 0) {
          return new Response(
            JSON.stringify({ message: "User not found", exists: false, userID: 0 }),
            { status: 200, headers: corsHeaders },
          );
        }

        return new Response(
          JSON.stringify({
            message: "User found",
            exists: true,
            userID: rows[0].id,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          },
        );
      } catch (error) {
        // console.error("Error querying database:", error);
        return new Response(
          JSON.stringify({ message: "Error finding user" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          },
        );
      }
    } else {
      return new Response("Method Not Allowed", { status: 405 });
    }
  }


  if (url.pathname === "/getUserInfoByID") {
    if (req.method === "GET") {
      try {
        const urlParams = new URLSearchParams(url.search);
        const id = urlParams.get("id");

        if (!id) {
          return new Response(
            JSON.stringify({ message: "id parameter is missing" }),
            { status: 400, headers: corsHeaders },
          );
        }

        const [rows] = await connection.execute<RowDataPacket[]>(
          `SELECT password FROM user_accounts WHERE id = ? LIMIT 1`,
          [id],
        );

        if (rows.length === 0) {
          return new Response(
            JSON.stringify({ message: "User not found", exists: false, pass: "Could not grab user data"}),
            { status: 200, headers: corsHeaders },
          );
        }

        return new Response(
          JSON.stringify({
            message: "User found",
            exists: true,
            pass: rows[0].password,
          }),

          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          },
        );
      } catch (error) {
        // console.error("Error querying database:", error);
        return new Response(
          JSON.stringify({ message: "Error finding user" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          },
        );
      }
    } else {
      return new Response("Method Not Allowed", { status: 405 });
    }
  } else {
    // Handle 404 for any other route
    return new Response("Not Found", { status: 404 });
  }
});
