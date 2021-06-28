import { Connection } from "typeorm"
import { testConn } from "../../test-utils/testConn";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
})

afterAll(async () =>{
    await conn.close()
})

