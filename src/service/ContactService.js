import axios from 'axios';
import RequestUrl from "@/service/RequestUrl";
import Cookies from 'js-cookies'
import UserService from "@/service/UserService";
//var accessToken = Cookies.getItem('access_token');

var ContactService = {

    postUserAgreed: function(data, fn){
        var reqUrl = RequestUrl.AGREEN_USER;
        axios
            .post(reqUrl, data)
            .then(function (result) {
                fn(undefined, result.data);
            })
            .catch(function (error) {
                fn(error);
            })
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
                    access_token:UserService.getAccessToken()
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
                    access_token:UserService.getAccessToken()
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
    addUser: function(data, fn){
        var reqUrl = RequestUrl.ADDUSER;
        axios
            .post(reqUrl, data)
            .then(function (result) {
                var data = result.data;
                if(data.isSuccess){
                    fn(undefined, data.addFriendMsg);

                }else{
                    fn(data.reason);
                }
            })
            .catch(function (error) {
                fn(error);
                //alert(error);
            });
    },
    postUserRejected(data, fn) {
        var reqUrl = RequestUrl.REJECT_USER;
        axios
            .post(reqUrl, data)
            .then(function (result) {
                fn(undefined, result.data);
            })
            .catch(function (error) {
                fn(error);
            });
    }
}

export default ContactService;