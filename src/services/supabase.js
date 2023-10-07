import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zwtzhwytbgcppyipsifp.supabase.co";
//SERVICE KEY from supabase
const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dHpod3l0YmdjcHB5aXBzaWZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjU5OTQ4OCwiZXhwIjoyMDEyMTc1NDg4fQ.LNBFxGDaaoIZ14igb5BEYlsPq-hTrtpZIjKJ15Dt49k';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;