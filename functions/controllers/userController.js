const factory = require("./handlerFactory");
const User = require("../models/user");
const {APIFeatureQuery, FilterExpression, filterUnit} = require("../models/APIFeatureQuery");

/** add new user - (body: [userId,name,address,email,mobileNo]) -
 (name,address,email,mobileNo is required)
 */

const extraProps = {
  'createdDate': new Date,
  'updatedDate': null,
  'isActive': true,
  'isDelete': false
}
exports.createUser = factory.createOne(User, extraProps);
exports.getUserById = factory.getOneWithMapper(User);
exports.updateUser = factory.updateOneWithMapper(User);
// exports.deleteUserById = factory.deleteOne(User.Firebase);
exports.deactivateUserById = factory.disableOne(User);


APIFeatureQuery.filter = [
  filterUnit('role', FilterExpression.equal, 'admin'),
]

// APIFeatureQuery.paginate.limit = 4
// APIFeatureQuery.paginate.startingIndex = 'bckk1hf5LZDIOk4No0b0'

exports.getAllUser = factory.getAll(User, APIFeatureQuery)
