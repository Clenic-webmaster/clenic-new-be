var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "102",
        "ok": "102",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "1482",
        "ok": "1482",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "8976",
        "ok": "8976",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "6605",
        "ok": "6605",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "2016",
        "ok": "2016",
        "ko": "-"
    },
    "percentiles1": {
        "total": "6906",
        "ok": "6906",
        "ko": "-"
    },
    "percentiles2": {
        "total": "8281",
        "ok": "8281",
        "ko": "-"
    },
    "percentiles3": {
        "total": "8829",
        "ok": "8829",
        "ko": "-"
    },
    "percentiles4": {
        "total": "8935",
        "ok": "8935",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 0,
    "percentage": 0
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 102,
    "percentage": 100
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "6.375",
        "ok": "6.375",
        "ko": "-"
    }
},
contents: {
"req_user-1-85897": {
        type: "REQUEST",
        name: "User_1",
path: "User_1",
pathFormatted: "req_user-1-85897",
stats: {
    "name": "User_1",
    "numberOfRequests": {
        "total": "102",
        "ok": "102",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "1482",
        "ok": "1482",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "8976",
        "ok": "8976",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "6605",
        "ok": "6605",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "2016",
        "ok": "2016",
        "ko": "-"
    },
    "percentiles1": {
        "total": "6906",
        "ok": "6906",
        "ko": "-"
    },
    "percentiles2": {
        "total": "8281",
        "ok": "8281",
        "ko": "-"
    },
    "percentiles3": {
        "total": "8829",
        "ok": "8829",
        "ko": "-"
    },
    "percentiles4": {
        "total": "8935",
        "ok": "8935",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 0,
    "percentage": 0
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 102,
    "percentage": 100
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "6.375",
        "ok": "6.375",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
