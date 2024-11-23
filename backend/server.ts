import mysql from "npm:mysql2@^2.3.3/promise";
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
  "Access-Control-Max-age": "86400"
};

Deno.serve(async (req) => {
  // Handle OPTIONS request (CORS preflight)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204, 
      headers: corsHeaders, 
    })
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("Received body:", body);

      const { fname, lname, email, password, phone } = body;


      await connection.execute(
        `INSERT INTO user_accounts (fname, lname, email, password, phone) VALUES (?, ?, ?, ?, ?)`,
        [fname, lname, email, password, phone]
      );


      return new Response(
        JSON.stringify({ message: "User registered successfully!" }),
        {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    } catch (error) {
      console.error("Error inserting into database:", error);
      return new Response(
        JSON.stringify({ message: "Error inserting data" }),
        {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  } else {
    console.log("method:", req.method);
    return new Response("Method Not Allowed", { status: 405 });
  }
});
