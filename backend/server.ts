Deno.serve(async (req, res) =>{
    const url = new URL(req.url);
    console.log("Path:", url.pathname);
    console.log("Query parameters:", url.searchParams);
  
    console.log("Headers:", req.headers);
    // const body2 = JSON.parse(await req.text())
    const formData = await req.formData();  // Automatically parses the form data
        formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);  // Log form fields and values
    });

    if(req.body){
        const body = formData;
        console.log("Body from API:", body);
    }

    return new Response("Response");
})
  