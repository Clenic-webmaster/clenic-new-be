/*
 * Copyright 2011-2020 GatlingCorp (https://gatling.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package computerdatabase

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._

class GetEquipmentSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("https://backend.clenic.rbit.pe") 
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") 
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val scn = scenario("Get Equipments") 
    .exec(
      http("User_1") 
        .get("/bussiness/equipment/list")
        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjUwNjAzNDJlODU4ZDRhZmNlZGVjZTQiLCJidXNzaW5lc3NJZCI6IjVmNTA2MDM0MmU4NThkNGFmY2VkZWNlNSIsImlkZW50aWZpZXIiOiJjbGluaWNhX2plc3VzX2RlbF9ub3J0ZSIsImNvbXBhbnlJZGVudGlmaWVyIjoic2llbWVuc19zYWMiLCJyb2xlIjp7Il9pZCI6IjVmNGZiN2NhOGFmMjhlNTNhMWYyOGVhYiIsIm5hbWUiOiJST0xFX0NMRU5JQyIsImFjdGl2ZSI6dHJ1ZX0sImlhdCI6MTYwNjU2NzI2NX0.V3ZmHX3rpj-ayvBmBC2DGqb5nhcs7voIL6XEz3q4-q-yO-lEb2EmmTo8wAe1bEm81IBUHU4DZi6sa8CsrNgO33AJSTgHmWxd0BmGNzorq9cRMaemHFZ9pxXswJyEmxNiFTdB2y9C-M5qr-Aytwf0taQ5SZdZXwkMSOk6cInwIls")
    )
    

  setUp(scn.inject(atOnceUsers(2),constantUsersPerSec(2) during(10 seconds))).protocols(httpProtocol)

}