import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

mongoose.connect(process.env.DSN);


// users
// * our site requires authentication...
// * so users have a username and password as well as all the lists
const UserSchema = new mongoose.Schema({
  
  // password hash provided by authentication plugin
  username: {type: String, required: true},     
  password: {type: String, required: true},
  email: {type: String, required: true},
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }]

});

const TempRestaurantsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
  temp: {type: String, required: true}
});

const RestaurantsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Popular' }]
  });

  const FoodSchema = new mongoose.Schema({
    cuisine: {type: String, required: true},
    dish: {type: String, required: true},
  })

  const ReviewSchema = new mongoose.Schema({
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants' }],
    description: {type: String, required: true},  // what was ordered and pricing and service ig
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    date: {type: Date, default: Date.now}
  });



// TODO: add remainder of setup for slugs, connection, registering models, etc. below

UserSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=username%>'});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Food = mongoose.models.Food || mongoose.model('Food', FoodSchema);
export const TempRestaurants = mongoose.models.TempRestaurants || mongoose.model('TempRestaurants', TempRestaurantsSchema ); 

//mongoose.model('User', UserSchema);
//mongoose.model('Food', FoodSchema);


export const Restaurants = mongoose.models.Restaurants || mongoose.model('Restaurants', RestaurantsSchema ); 
export const Reviews = mongoose.models.Reviews || mongoose.model('Reviews', ReviewSchema);

//export default User; export default Food;  export default TempRestaurants; export default Restaurants; export default Reviews;