import axios from 'axios';

const signup_API_BASE_URL = "http://localhost:8000/api/v1.0/user/register";
const login_API_BASE_URL = "http://localhost:8000/api/v1.0/user/login";
const forget_API_BASE_URL = "http://localhost:8000/api/v1.0/user/forgetPassword";

const genetare_otp = "http://localhost:8000/api/v1.0/user/generateOtp";
const login_using_gmail_otp = "http://localhost:8000/api/v1.0/user/loginOtp";
const find_user_detail = "http://localhost:8000/api/v1.0/user/customerDetails";
const user_account_deactivate = "http://localhost:8000/api/v1.0/user/deactivate";
const user_subscription = "http://localhost:8000/api/v1.0/user/subscribed";

class allBackendService {
    createSignup(register){
        return axios.post(signup_API_BASE_URL, register);
    }

    createLogin(login){
        return axios.post(login_API_BASE_URL, login);
    }

    forgetPassword(forgetPassword){
        return axios.patch(forget_API_BASE_URL,forgetPassword);
    }
    generateOtp(generateOtp){
        return axios.post(genetare_otp,generateOtp);
    }
    loginUsingOtp(loginOtp){
        return axios.post(login_using_gmail_otp,loginOtp);
    }
    findUserDetail(userEmail){
        return axios.get(find_user_detail+"/"+userEmail);
    }
    accountDeactivate(userEmail){
        return axios.patch(user_account_deactivate+"/"+userEmail);
    }
    subscribe(userEmail){
        return axios.patch(user_subscription+"/"+userEmail);
    }
}
export default new allBackendService();