'use server'

import { createClient } from "@/lib/supabase/server"

const getUsers = async () => {
    const supabase = await createClient()

}