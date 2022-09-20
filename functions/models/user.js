const db = require("../config/firebaseConfig").firestore();
const mapper = require('js-model-mapper')

exports.Query = db.collection("users");

exports.PublicScheme = mapper([
    'name',
    'email',
    'role',
    'createdDate'
]);

exports.User = {
    'username': '',
    'first_name': '',
    'last_name': '',
    'telephone': '',
    'create_at': '',
    'modified_at': '',
    'privacy_preferences': [],
    'showNameOption': 'fullname' // - Onlyname,nameWithCencored, Fullname, nickname
}