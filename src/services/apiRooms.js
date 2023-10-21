
import supabase from './supabase'
export async function getRooms() {
    const { data, error } = await supabase.from("rooms").select("*");
    
    if (error) {
        console.error(error);
        throw new Error("Rooms could not get loaded");
    }
    
    return data;
    }

export async  function createRoom(newRoom) {
    
const { data, error } = await supabase
.from('rooms')
.insert([
    newRoom
])
.select()
if (error) {
    throw new Error("Room could not be created");
}

};

export async function deleteRoom(id) {  
const {data, error } = await supabase
.from('rooms')
.delete()
.eq('id', id)
if (error) {
    throw new Error("Room could not be deleted");
}
return data;



    }