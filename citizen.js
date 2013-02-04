//Facebook connection library
//Author: Tom Mazer

//INDEX;
//1. CONFIG
//2. INIT
//3. var


var _config = {
    packages: {
        facebook: {
            location: "//connect.facebook.net/nl_NL/all.js"
        },
        parse: {
            location: "//www.parsecdn.com/js/parse-1.0.10.min.js"
        },
        async: {
            location: "//cdnjs.cloudflare.com/ajax/libs/async/1.22/async.min.js"
        },
        jquery: {
            location: "//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"
        },
        bootstrap_js: {
            location: "//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min.js"
        },
        bootstrap_css: {
            location: "//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css"
        },
        chosen_js: {
            location: "assets/chosen.jquery.min.js"
        },
        chosen_css: {
            location: "assets/chosen.css"
        }
    },
    facebookId: "", //ENTER FBID
    facebookNamespace: "", //ENTER FB NAMESPACE
    facebookPermissions: "email",
    parseId: "", //ENTER PARSE ID
    parseSecret: "", //ENTER PARSE JAVASCRIPT SECRET
    production: false
};

var navigation = {
    connect: {
        success: function(){
            alert("Navigation.connect.success()");
        },
        error: function(){
            alert("Navigation.connect.error()");
        }
    }
}

var _init = {
    loadScripts: function loadScripts(callback){
        var _this = this;
        var _includesSucces = 0;

        //FACEBOOK
        var body = document.body;
        var fbroot = document.createElement('div');
        fbroot.id = 'fb-root';
        body.insertBefore(fbroot, body.firstChild);

        //ASYNC
        this._loadScripts(_config.packages.async.location, "js", function(){
            _loadComplete();
            console.log('Async-library loaded');
        });

        //jQuery
        this._loadScripts(_config.packages.jquery.location, "js", function(){
            _loadComplete();
            console.log('jQuery-library loaded');

            //Bootstrap JS
            _this._loadScripts(_config.packages.bootstrap_js.location, "js", function(){
                _loadComplete();
                console.log('Bootstrap_js loaded');
            });

            //CHOSEN JS
            _this._loadScripts(_config.packages.chosen_js.location, "js", function(){
                _loadComplete();
                console.log('Chosen-library loaded');
            });

            //PARSE
            _this._loadScripts(_config.packages.parse.location, "js", function(){
                _loadComplete();
                console.log('Parse-SDK loaded');

                //FACEBOOK SDK
                _this._loadScripts(_config.packages.facebook.location, "js", function(){
                    _loadComplete();
                    console.log('Facebook-SDK loaded');
                });
            });
        });

        //Bootstrap CSS
        this._loadScripts(_config.packages.bootstrap_css.location, "css", function(){
            _loadComplete();
            console.log('Bootstrap_css loaded');

            //CHOSEN CSS
            _this._loadScripts(_config.packages.chosen_css.location, "css", function(){
                _loadComplete();
                console.log('Chosen-css loaded');
            });
        });

        

        function _loadComplete(){
            _includesSucces++;
            if(_includesSucces == Object.keys(_config.packages).length){
                callback();
            }
        }
    },
    _loadScripts: function _loadScripts(url, type, callback){
        var script;
        if (type == "js"){
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
        }
        if (type == "css"){
            script = document.createElement('link');
            script.href = url;
            script.rel = "stylesheet";
        }
        var head = document.getElementsByTagName('head')[0];
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }
};

var citizen = {
    init: function init(callback){
        function ensureCallback(){
            callback();
        }

        if(_config.production === true){
            console.log = function() {};
        }
        _init.loadScripts(function(){
            Parse.initialize(_config.parseId, _config.parseSecret);
            window.fbAsyncInit = function() {
                Parse.FacebookUtils.init({
                    appId: _config.facebookId,
                    status: true,
                    cookie: true,
                    xfbml: true
                });
                ensureCallback();
            };
        });
    },
    facebook: {
        loadPlugins: function loadPlugins(){
            this.likeButton();
            this.sendButton();
            this.followButton();
            this.commentsBox();
            this.likeBox();
            this.connect();
        },
        likeButton: function likeButton(){
            $('.ct.like').each(function(index){
                var likeButton = document.createElement('div');
                $(likeButton).addClass('fb-like');
                if($(this).attr('data-href')){
                    $(likeButton).attr('data-href', $(this).attr('data-href'));
                } else {
                    $(likeButton).attr('data-href', window.location);
                }

                if($(this).attr('data-send')){
                    $(likeButton).attr('data-send', $(this).attr('data-send'));
                } else {
                    $(likeButton).attr('data-send', 'false');
                }

                if($(this).attr('data-width')){
                    $(likeButton).attr('data-width', $(this).attr('data-width'));
                } else {
                    $(likeButton).attr('data-width', '450');
                }

                if($(this).attr('data-show-faces')){
                    $(likeButton).attr('data-show-faces', $(this).attr('data-show-faces'));
                } else {
                    $(likeButton).attr('data-show-faces', 'true');
                }

                $(this).html(likeButton);
            });
        },
        sendButton: function sendButton(){
            $('.ct.send').each(function(index){
                var sendButton = document.createElement('div');
                $(sendButton).addClass('fb-send');
                if($(this).attr('data-href')){
                    $(sendButton).attr('data-href', $(this).attr('data-href'));
                } else {
                    $(sendButton).attr('data-href', window.location);
                }

                $(this).html(sendButton);
            });
        },
        followButton: function followButton(){
            $('.ct.follow').each(function(index){
                var followButton = document.createElement('div');
                $(followButton).addClass('fb-follow');
                if($(this).attr('data-href')){
                    $(followButton).attr('data-href', $(this).attr('data-href'));
                } else {
                    console.log('FollowButton: Location required');
                    return false;
                }

                if($(this).attr('data-width')){
                    $(followButton).attr('data-width', $(this).attr('data-width'));
                } else {
                    $(followButton).attr('data-width', '450');
                }

                if($(this).attr('data-show-faces')){
                    $(followButton).attr('data-show-faces', $(this).attr('data-show-faces'));
                } else {
                    $(followButton).attr('data-show-faces', 'true');
                }

                $(this).html(followButton);
            });
        },
        commentsBox: function commentsBox(){
            $('.ct.comments').each(function(index){
                var commentsBox = document.createElement('div');
                $(commentsBox).addClass('fb-comments');
                if($(this).attr('data-href')){
                    $(commentsBox).attr('data-href', $(this).attr('data-href'));
                } else {
                    $(commentsBox).attr('data-href', window.location);
                }

                if($(this).attr('data-width')){
                    $(commentsBox).attr('data-width', $(this).attr('data-width'));
                } else {
                    $(commentsBox).attr('data-width', '450');
                }

                if($(this).attr('data-num-posts')){
                    $(commentsBox).attr('data-num-posts', $(this).attr('data-num-posts'));
                } else {
                    $(commentsBox).attr('data-num-posts', '2');
                }

                $(this).html(commentsBox);
            });
        },
        likeBox: function likeBox(){
            $('.ct.likebox').each(function(index){
                var likeBox = document.createElement('div');
                $(likeBox).addClass('fb-like-box');
                if($(this).attr('data-href')){
                    $(likeBox).attr('data-href', $(this).attr('data-href'));
                } else {
                    console.log('Likebox: Location required');
                    return false;
                }

                if($(this).attr('data-width')){
                    $(likeBox).attr('data-width', $(this).attr('data-width'));
                } else {
                    $(likeBox).attr('data-width', '292');
                }

                if($(this).attr('data-show-faces')){
                    $(likeBox).attr('data-show-faces', $(this).attr('data-show-faces'));
                } else {
                    $(likeBox).attr('data-show-faces', 'false');
                }

                if($(this).attr('data-header')){
                    $(likeBox).attr('data-header', $(this).attr('data-header'));
                } else {
                    $(likeBox).attr('data-header', 'false');
                }

                if($(this).attr('data-stream')){
                    $(likeBox).attr('data-stream', $(this).attr('data-stream'));
                } else {
                    $(likeBox).attr('data-stream', 'false');
                }

                $(this).html(likeBox);
            });
        },
        connect: function connect(){
            $('.ct.connect').each(function(index){
                var connectFn = "citizen.user.connect()";
                $(this).attr("onclick", connectFn);
                $(this).attr("href", "JavaScript:void(0);");
            });
        },
        og: {
            custom: function(actionType, data){
                var _this = this;
                if(typeof data != "Object"){
                    var data = {}; 
                }
                var fbUrl = '/me/' + _config.facebookNamespace + ':' + actionType;
                FB.api(fbUrl, 'POST', data, function(response){
                    if(!response || response.error){
                        console.log(response.error);
                    } else {
                        _this.parse.action.save(response.id, actionType);
                    }
                });
            },
            like: function(actionType, data){
                var _this = this;
                if(typeof data != "Object"){
                    var data = {}; 
                }
                var fbUrl = '/me/og.likes';
                FB.api(fbUrl, 'POST', data, function(response){
                    if(!response || response.error){
                        console.log(response.error);
                    } else {
                        _this.parse.action.save(response.id, 'like');
                    }
                });
            }
        }
    },
    chosen: {
        loadPlugins: function loadPlugins(){
            this.selectbox();
        },
        selectbox: function selectbox(){
            var numElements = $('.ct.chosen').length;
            $('.ct.chosen').each(function(index){
                var chosenSelect = document.createElement('select');
                var option = document.createElement('option');
                option.setAttribute('value', '');
                if($(this).attr('data-multiple') && $(this).attr('data-multiple') == 'true'){
                    chosenSelect.setAttribute('multiple', 'multiple');
                }
                
                chosenSelect.setAttribute('data-placeholder', $(this).attr('data-placeholder'));
                $(chosenSelect).width($(this).attr('data-width'));
                $(chosenSelect).addClass('chzn-select');
                $(chosenSelect).append(option);
                $(this).append(chosenSelect);
                if((index + 1) == numElements){
                    $('.chzn-select').chosen();
                }
            });
        }
    },
    user: {
        connect: function connect(){
            var _this = this;
            Parse.FacebookUtils.logIn(_config.facebookPermissions, {
                success: function(user) {
                    if (!user.existed()) {
                        console.log("User signed up and logged in through Facebook!");
                        _this.getUserData();
                    } else {
                        console.log("User logged in through Facebook!");
                    }
                    navigation.connect.success();
                },
                error: function(user, error) {
                    console.log("User cancelled the Facebook login or did not fully authorize.");
                    navigation.connect.error();
                }
            });
        },
        getUserData: function getUserData(){
            var _this = this;
            FB.api('/me', function(response) {
                _this.saveUserData(response);
            });
        },
        saveUserData: function saveUserData(userData){
            var user = Parse.User.current();
            user.set("name", userData.name);
            user.set("firstname", userData.first_name);
            user.set("lastname", userData.last_name);
            user.set("email", userData.email);
            user.setACL(new Parse.ACL(Parse.User.current()));
            user.save(null, {
                success: function(user) {
                    console.log("Userdata saved to Parse");
                },
                error: function(user, error) {
                    console.log("Userdata failed to save");
                }
            });
        }
    },
    parse: {
        action: {
            save: function(actionId, type){
                var FbAction = Parse.Object.extend("FbAction");
                var fbAction = new FbAction();
                var user = Parse.User.current();
                fbAction.set("actionId", actionId);
                fbAction.set("fbUserId", user.attributes.authData.facebook.id);
                fbAction.set("type", type);
                fbAction.set("user", Parse.User.current());
                fbAction.set("count", 0);
                fbAction.save(null, {
                    success: function(fbAction) {
                        console.log(fbAction);
                        // The object was saved successfully.
                    },
                    error: function(fbAction, error) {
                        console.log(error);
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                    }
                });
            }
        }
    }
};

citizen.init(function(){
    //CHECK FOR FACEBOOK ELEMENTS
    citizen.facebook.loadPlugins();
    citizen.chosen.loadPlugins();
});