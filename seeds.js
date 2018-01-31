var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "clouds rest again",
        image: "http://www.imgworlds.com/wp-content/uploads/2015/12/generic.jpg",
        description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). "
        
    },
    {
        name: "clouds rest again 2",
        image: "http://viralwork.com/file/2016/12/crown-prince-skyscrapers-sunrise-mist-fazza-dubai-8.jpg",
        description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). "
        
    },
    {
        name: "clouds rest again 3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCzSVEzlFluxrsw3HdNQ4Zn4RugUg2SwYTEcPt0fgKfpACP5t",
        description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). "
        
    }
    
    
    ]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("removed campground");
        //add a few campground
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if(err) {
        //             console.log(err)
        //         } else {
        //             console.log("added a campground");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "this place is great but i wish i had internet",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err) {
        //                         console.log(err);
        //                     } else {
        //                          campground.comments.push(comment._id);
        //                          campground.save();
        //                          console.log("Created new comment")
        //                     }
        //                 });
        //         }
        //     });
        // });
    }
});

}

module.exports = seedDB;
