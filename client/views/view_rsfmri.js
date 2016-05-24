Template.view_rsfmri.events({

    "submit .new-qc": function(event){

        event.preventDefault();
        if (! Meteor.userId()) {
          throw new Meteor.Error("not-authorized");
        }


        form_values = $("#QC_form").serializeArray()
        form_data = {}
        for (i=0;i<form_values.length;i++){
            form_data[form_values[i]["name"]] = form_values[i]["value"]
        }
        Meteor.call("updateQC_rsfmri", this.mse, form_data, this.name)
        //console.log("called updateQC method!")
    }

})

//var staticURL = "https://dl.dropboxusercontent.com/u/9020198/data/"

Template.view_rsfmri.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      //console.log('Template onLoad');
    }
    params = {}
    Rparams = Router.current().params
    Meteor.subscribe("rsfmri", Rparams.imageFilename)
    console.log("rendered rsfmri", Rparams.imageFilename)
    this.autorun(function(){
        var doc = RSFMRI.findOne({_id: Rparams.imageFilename})
        console.log("doc is", doc)
        if (doc) {
            params["images"] = [staticURL+"templates/OASIS-30_Atropos_template_in_MNI152.nii.gz", staticURL+doc.filename]
            papaya.Container.addViewer("viewer", params, function(){console.log(params)})
        }

    })

}