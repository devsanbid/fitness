import mongoose from "mongoose";

export const database_connected =(url) => {
   mongoose.connect(url).then(() => {
    console.log("database connected sucessfully")
  })
}

