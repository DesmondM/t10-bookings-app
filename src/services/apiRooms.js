import supabase from './supabase'
export async function getRooms() {
    const { data, error } = await supabase.from("rooms").select("*");
    
    if (error) {
        console.error(error);
        throw new Error("Rooms could not get loaded");
    }
    
    return data;
    }