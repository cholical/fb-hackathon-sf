const functions = require('firebase-functions');
const admin = require('firebase-admin');
const FB = require('fb');

admin.initializeApp();

const db = admin.firestore();
var users = db.collection('users');
var tasks = db.collection('tasks');

const appToken = '2216219015338030|D4wYcinkvkDi7nssqXz0gnLSH-I';

exports.signIn = functions.https.onRequest(async (request, response) => {
	var fbAccessToken = request.body.fbAccessToken;
	var name = request.body.name;
	var profilePhoto = request.body.profilePhoto;
	verifyFacebookUserAccessToken(fbAccessToken).then((fbResponse) => {
		if (fbResponse.data.error) {
			response.send(401);
		}
		var userId = fbResponse.data.user_id;
		console.log('conditionalSaveUserData invoked');
		conditionalSaveUserData(userId, name, profilePhoto).then(() => {
			var responseObject = {
				userId: userId
			}
			console.log('responseObject: ', responseObject);
			response.send(responseObject);
		});
	});
});

exports.createTask = functions.https.onRequest(async (request, response) => {
	var fbAccessToken = request.body.fbAccessToken;
	verifyFacebookUserAccessToken(fbAccessToken).then((fbResponse) => {
		if (fbResponse.data.error) {
			response.send(401);
		}
		var userId = fbResponse.data.user_id;
		createTask(request.body, userId).then(taskId => {
			var responseObject = {
				taskId: taskId
			}
			response.send(responseObject);
		});
	});
});

exports.getTasks = functions.https.onRequest((request, response) => {
	var tasksCollection = tasks.get().then((snapshot) => {
		var responseObject = {
			tasks: snapshot.docs.map(doc => {
				var rawDoc = doc.data();
				rawDoc.taskId = doc.id;
				return rawDoc;
			})
		}
		response.send(responseObject);
	});
});

exports.increaseBounty = functions.https.onRequest((request, response) => {

});

exports.getTask = functions.https.onRequest(async (request, response) => {
	var taskId = request.query.taskId;
	var task = getTask(taskId).then(task => {
		var responseObject = {
			task: task
		}
		response.send(responseObject);
	});
});

exports.createCompletionAttempt = functions.https.onRequest((request, response) => {

});

exports.acceptCompletionAttempt = functions.https.onRequest((request, response) => {

});

exports.getUserProfile = functions.https.onRequest((request, response) => {
	var userId = request.query.userId;
	var task = getUserProfile(userId).then(userProfile => {
		var responseObject = {
			userProfile: userProfile
		}
		response.send(responseObject);
	});
});

var verifyFacebookUserAccessToken = function (fbAccessToken) {
	return new Promise((resolve, reject) => {
		FB.api(
	    `/debug_token?input_token=${fbAccessToken}&access_token=${appToken}`,
	    function (response) {
	    	if (response.error) {
	    		console.log(response.error);
	    	}
	      console.log(response);
	      resolve(response);
	    }
		);
	});
}

var conditionalSaveUserData = function (userId, name, profilePhoto) {
	return new Promise((resolve, reject) => {
		console.log('conditionalSaveUserData called');
		var user = users.doc(userId).get().then(doc => {
			if (!doc.exists) {
				var newUser = {
					bounties: 1,
					name: name,
					profilePhoto: profilePhoto
				}
				users.doc(userId).set(newUser);

			}
			resolve();
		});
	});
}

var createTask = function (requestBody, userId) {
	return new Promise((resolve, reject) => {
		console.log('createTask called');
		var newTask = {
			acceptedCompletionAttemptId: "",
			bounty: 1,
			completed: false,
			description: requestBody.description,
			opUserId: userId,
			photoLink: requestBody.photoLink,
			taskName: requestBody.taskName
		}
		var task = tasks.add(newTask).then(ref => {
			console.log(ref);
			resolve(ref.id);
		})
	});
}

var getTask = function (taskId) {
	return new Promise((resolve, reject) => {
		console.log('getTask called');
		var task = tasks.doc(taskId).get().then(doc => {
			resolve(doc.data());
		});
	});
}

var getUserProfile = function (userId) {
	return new Promise((resolve, reject) => {
		console.log('getUserProfile called');
		var userProfile = users.doc(userId).get().then(doc => {
			resolve(doc.data());
		});
	});
}