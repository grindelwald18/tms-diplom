import { client } from '../api/client'
import { bookEndpoint } from '../api/endpoint'
async function requestBook (isbn13: string) {
  const { data } = await client.get(bookEndpoint + isbn13)
  console.log("requestBook ",data)
  return data
}
export { requestBook }
