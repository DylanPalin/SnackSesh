import { db } from "./utils/db.mts";

async function main() {
  
  const allUsers = await db
    .selectFrom('users')
    .select(["username"])
    .execute();

    allUsers.forEach((user) => {
      console.log(user.username);
    });

  console.log(allUsers);
}

main();