import { createClient } from "@/lib/supabase/server"

type Params = Promise<{id:string}>

export async function DELETE(req:Request, {params}:{params:Params}){
    try {

        const {id} =  await params

        const supabase = createClient();

        const {error} = await supabase.from("notes").delete()
        .eq("id", id)

        if(error){
            return Response.json({
                success:false,
                message:error.message
            })
        }

        return Response.json({
            success:true,
            message:"Note has been deleted"
        },{status:200})
        
    } catch (error) {
        return Response.json({
            success:false,
            message:"Something went wrong."
        })
    }
}

export async function PUT(req:Request, {params}:{params:Params}){
    
    try {
        
        const {id} = await params
        const {title, description} = await req.json();

        if(id === null || !title || !description){

            return Response.json({
                success:false,
                message:"Please provide id, title, description"
            },{status:401})
        }

        const supabase = createClient();

        const {data, error} = await supabase.from("notes")
        .update({title, description})
        .eq("id", id)


        if(error){
            console.log(error.message)
            return Response.json({
                success:false,
                message:error.message
            },{status:401})
        }
        
        return Response.json({
            success:true,
            data:data
        })

    } catch (error) {
        
        return Response.json({
            success:false,
            message:"Something went wrong."
        },{status:401})
    }
}