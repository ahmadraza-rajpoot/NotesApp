import { createClient } from "@/lib/supabase/server";


export async function POST(req:Request){

    try {

        const {title, description} = await req.json()
        console.log(title, description)

        if(!title.trim() || !description.trim()){
            return Response.json({
                success:false,
                message:"Please provide title and descrition"
            })
        }

        const supabase = createClient();

        const {error} = await supabase.from("notes")
        .insert({
            title, description
        })

        if(error){
            return Response.json({
                success:false,
                message:error.message
            })
        }

        return  Response.json({
            success:true,
            message:"Notes has been inserted."
        })
        
    } catch (error) {

        return  Response.json({
            success:false,
            message: error instanceof Error? error.message: "Something went wrong"
        })
    }

}


export async function GET(req:Request){

    try {
        
        const supabase = createClient();

        const {data, error} = await supabase.from("notes")
        .select("*").order("created_at", {ascending:false})

        if(error){
            return Response.json({
                success:false,
                message:error.message
            },{status:501})
        }

        return Response.json({
            success:true,
            data:data
        },{status:200})


    } catch (error) {
        
        return Response.json({
            success:false,
            message:error instanceof Error?error.message:"Something went wrong."
        },{status:501})
    }

}