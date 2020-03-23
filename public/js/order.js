function navigate(id){
    let divId = "#d"+id;
    let allDiv = [1,2,3,4,5];
    // let div = document.getElementById("divId");
    console.log(divId);
    $(String(divId)).fadeIn(600);
    allDiv.splice(id-1, 1);
    console.log(allDiv);
    for (i=0; i<allDiv.length; i++){
        let rmDivId = "#d"+allDiv[i];
        $(String(rmDivId)).hide();
    }
    // $(String(divId)).hide();
    // console.log("hidden");
}