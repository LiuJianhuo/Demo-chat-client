import axios from 'axios';
import RequestUrl from "@/service/RequestUrl";
import Cookies from 'js-cookies'

//var accessToken = Cookies.getItem('access_token');

var UserService = {
    getAccessToken : function () {
        return Cookies.getItem("access_token");
    },
    fetchContacts : function (userName, fn) {
        var reqUrl = RequestUrl.CONTACTS;
        axios
            .get(reqUrl, {
                params: {
                    userName: userName
                }
            })
            .then(function (result) {
                var contacts = result.data;
                fn(undefined, contacts);
            })
            .catch(function (error) {
                fn(error)
            });
    },
    fetchRecommendFriends: function (fn) {
        var reqUrl = RequestUrl.RECOMMENT_DFRIENDS;
        axios
            .get(reqUrl,{
                params:{
                    access_token:this.getAccessToken()
                }
            })
            .then(function (result) {
                //alert(result)
                var data = result.data;
                if(data.isSuccess){
                    fn(undefined, data.users)
                }else{
                    fn(data.reason);
                }
            })
            .catch(function (error) {
                fn(error);
            });
    },
    fetchFriendNotifitation: function (fn) {
        var reqUrl = RequestUrl.FRIEND_NOTIFITATION;
        axios
            .get(reqUrl,{
                params:{
                    access_token:this.getAccessToken()
                }
            })
            .then(function (result) {
                //alert(result)
                var data = result.data;
                if(data.isSuccess){
                    fn(undefined, data.notifitations);
                }else{
                    fn(data.reason);
                }
            })
            .catch(function (error) {
                fn(error);
            });
    },
    addUser: function(user, fn){
        var reqUrl = RequestUrl.ADDUSER;
    }
}

export default UserService;