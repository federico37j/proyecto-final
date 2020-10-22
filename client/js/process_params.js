"use strict";

function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    // console.log("Paramstr", paramstr);
    // console.log("Paramarr", paramarr);
    let params = [];
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];//{"index": 1}
    }
    return params;
}