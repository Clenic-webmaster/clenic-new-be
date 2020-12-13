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

class GetSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("https://backend.clenic.rbit.pe") 
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") 
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val scn = scenario("Get Tests") 
    .exec(
      http("User_1") 
        .get("/order/list")
        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjUyYjUzYjQ4OTIyODFmOTA0NzVmNDQiLCJidXNzaW5lc3NJZCI6IjVmNTJiNTNiNDg5MjI4MWY5MDQ3NWY0NSIsImlkZW50aWZpZXIiOiJjbGluaWNhX2ludGVybmFjaW9uYWwiLCJjb21wYW55SWRlbnRpZmllciI6InNpZW1lbnNfc2FjIiwicm9sZSI6eyJfaWQiOiI1ZjRmYjdjYThhZjI4ZTUzYTFmMjhlYWIiLCJuYW1lIjoiUk9MRV9DTEVOSUMiLCJhY3RpdmUiOnRydWV9LCJpYXQiOjE2MDY1NjU4NzZ9.cgMsjLVxMaJA7abhAZg4YwVESh1D69DN1R6ptpd7om28cWjvmfvAD_ERlLhI5GsOfc13xCOYuClEepqcBOgpMNY64Arhq7EJm-N3gmyV3QPJcdqropoFXckqxZdBpVX5o4Z8tzBKNK8L76aS53UgXxJBhGXcDqJ8Jfj_-iWrbRg")
    )
    

  setUp(scn.inject(atOnceUsers(2),constantUsersPerSec(10) during(10 seconds))).protocols(httpProtocol)

}