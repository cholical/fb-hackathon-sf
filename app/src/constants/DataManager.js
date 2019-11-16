import firebase from 'react-native-firebase';

if (!Object.prototype.watch) {
  Object.defineProperty(
    Object.prototype,
    "watch", {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function (prop, handler) {
        var old = this[prop];
        var cur = old;
        var getter = function () {
          return cur;
        };
        var setter = function (val) {
          old = cur;
          cur = handler.call(this,prop,old,val);
          return cur;
        };

        if (delete this[prop]) {
          Object.defineProperty(this,prop,{
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
          });
        }
      }
    }
  );
}

var uid;

if (firebase.auth().currentUser){
  uid = firebase.auth().currentUser.uid;
}

export default class DataManager {
  static myInstance = null;

  _state = {
    uid: uid,
    user: {},
    tiers: [],
    subTiers: [],
    refresh: false
  }

  constructor() {
    var root = this;
    firebase.database().ref('/users/'+uid+'/').once('value').then(function(snapshot) {
      if (snapshot.exists()){
        var user = snapshot.val();
        root._state.user = user;

        firebase.database().ref('/users/'+uid+'/paymentMethods/').on("child_added", function(snapshot) {
          const newData = snapshot.val();
          if (JSON.stringify(root._state.user["paymentMethods"][snapshot.key]) !== JSON.stringify(newData)){
            var user = root._state.user;
            user["paymentMethods"][snapshot.key] = newData;
            root.setState({user:user});
          }
        });
      }
    });

    firebase.database().ref('/tiers/').once('value').then(function(snapshot) {
      var tiers = [];
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.exists()){
          var childData = childSnapshot.val();
          tiers.push(childData);
        }
      });

      root._state.tiers = tiers;
    });

    firebase.database().ref('/subTiers/').once('value').then(function(snapshot) {
      var subTiers = [];
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.exists()){
          var childData = childSnapshot.val();
          subTiers.push(childData);
        }
      });

      root._state.subTiers = subTiers;
    });
  }

  /**
   * @returns {DataManager}
   */
  static getInstance() {
    if (DataManager.myInstance == null) {
      DataManager.myInstance = new DataManager();
    }

    return this.myInstance;
  }

  getState() {
    return this._state;
  }

  startListener(key, callback){
    this._state.watch(key, function(prop,oldval,newval){
      callback(newval);
      return newval;
    });
  }

  setState(state) {
    for (var key in state){
      if (key == "user"){
        var updates = {};

        if (JSON.stringify(state[key]["addresses"]) !== JSON.stringify(this._state[key]["addresses"])){
          updates['/users/'+uid+'/addresses/'] = state[key]["addresses"];
        }

        if (JSON.stringify(state[key]["paymentMethods"]) !== JSON.stringify(this._state[key]["paymentMethods"])){
          updates['/users/'+uid+'/paymentMethods/'] = state[key]["paymentMethods"];
        }

        if (Object.keys(updates).length>0){
          firebase.database().ref().update(updates, function(result) {

          });
        }
      }
    }

    for (var key in state){
      this._state[key] = state[key];
    }
  }
}
