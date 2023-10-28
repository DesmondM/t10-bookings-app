import supabase from "./supabase"

export async function login({email, password}) {

let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
    if (error) {
        console.log(error)
        throw new Error("Login failed")
    }
    console.log(data)
}