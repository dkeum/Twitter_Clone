import { NextResponse } from 'next/server'

import { NextRequest } from "next/server";

import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs"

export async function middleware( req: NextRequest){
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({req,res});
    await supabase.auth.getSession(); //refresh the session

    return res; 

}