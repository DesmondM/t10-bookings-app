

import supabase, { supabaseUrl } from './supabase';
export async function getRooms() {
    const { data, error } = await supabase.from("rooms").select("*");
    
    if (error) {
        console.error(error);
        throw new Error("Rooms could not get loaded");
    }
    
    return data;
    }

export async  function createRoom(newRoom) {
    
    //https://zwtzhwytbgcppyipsifp.supabase.co/storage/v1/object/public/rooms-images/cabin-001.jpg
const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll("/", "");

const imagePath= `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`

const { data, error } = await supabase
.from('rooms')
.insert([
   { ...newRoom, image: imagePath}
])
.select()
if (error) {
    throw new Error("Room could not be created");
}

const {error:storageError} = await supabase.storage
.from("rooms-images")
.upload(imageName, newRoom.image)

if (storageError) {
   await supabase.from("rooms").delete().eq("id", data.id);};
   throw new Error("Room could not be created");
    
}
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
    