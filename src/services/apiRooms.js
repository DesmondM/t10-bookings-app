

import supabase, { supabaseUrl } from './supabase';
export async function getRooms() {
    const { data, error } = await supabase.from("rooms").select("*");
    
    if (error) {
        console.error(error);
        throw new Error("Rooms could not get loaded");
    }
    
    return data;
    }

export async  function createEditRoom(newRoom, id) {  
    //https://zwtzhwytbgcppyipsifp.supabase.co/storage/v1/object/public/rooms-images/cabin-001.jpg
const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll("/", "");

const hasImagePath = newRoom.image?.startsWith(supabaseUrl);

const imagePath= hasImagePath? newRoom.image: `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`

let query = supabase.from('rooms')

//for create
if(!id) query = query.insert([{ ...newRoom, image: imagePath}])

//for edit
if(id) query= query.update({ ...newRoom, image: imagePath} ).eq('id', id)


 const {data, error } = await query.select().single()

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
    