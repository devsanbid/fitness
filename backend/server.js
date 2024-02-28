import { database_connected } from "./utils/database";
import { app } from "./middleware";


database_connected("mongodb://127.0.0.1:27017/users")

app.listen(8080, () => {
  console.log("Port is running on 8080");
});
