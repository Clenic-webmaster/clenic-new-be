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

class PCDSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("https://backend.clenic.rbit.pe") 
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8") 
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val scn = scenario("PCD Testing") 
    .exec(
      http("User_1") 
        .post("/auth/login")
        .body(StringBody("""
					{
                "username": "emgore.1410@gmail.com",
                "password": "12345",
                "companyIdentifier": "siemens_sac"
					}
			""")).asJson
    )
    .exec(
      http("User_2") 
        .post("/auth/login")
        .body(StringBody("""
					{
                "username": "emgore.1410+2@gmail.com",
                "password": "12345",
                "companyIdentifier": "siemens_sac"
					}
			""")).asJson
    )
    .exec(
      http("User_3") 
        .post("/auth/login")
        .body(StringBody("""
					{
                "username": "emgore.1410+3@gmail.com",
                "password": "12345",
                "companyIdentifier": "siemens_sac"
					}
			""")).asJson
    )

  setUp(scn.inject(atOnceUsers(0),constantUsersPerSec(2) during(10 seconds))).protocols(httpProtocol)

}