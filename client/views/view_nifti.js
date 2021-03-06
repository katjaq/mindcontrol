Template.view_image.events({

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
        Meteor.call("updateQC", this.mse, form_data, this.name)
        //console.log("called updateQC method!")
    }

})

var staticURL = "https://dl.dropboxusercontent.com/u/9020198/data/"

Template.view_image.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      //console.log('Template onLoad');
    }
    params = {}
    Rparams = Router.current().params
    params["images"] = [staticURL+Rparams.imageFilename+"/t1.nii.gz"]
    papaya.Container.addViewer("viewer", params, function(){console.log(params)})
}
