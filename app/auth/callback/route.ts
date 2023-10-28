import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log(requestUrl)
  console.log(code);

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}

// begin
//   insert into public.profiles(id, name, username, avatar_url)
//   values(
//     new.id,
//     new.raw_user_meta_data->>'name',
//     new.raw_user_meta_data->>'user_name',
//     new.raw_user_meta_data->>'avatar_url'
//   );
//   return new;
// end;