const axios = require('axios');
require('dotenv').config();

const keyrockEndpoint = 'http://172.18.1.5:3005';

/* Login user */
module.exports.login = async(req, res) => {
    try{
        const res1 = await axios.post(`${keyrockEndpoint}/v1/auth/tokens`,{"name":req.body.name, "password": req.body.password},{headers:{'Content-Type':'application/json'}});
        req.session.authenticated = true;
        req.session.xsubtoken = res1.headers["x-subject-token"];
        res.status(200).send({"authentication":true, "x-sub-token":req.session.xsubtoken}).end();
    }catch(error){
        if(error.response.status === 401)
            res.status(401).send({authentication :false, message:"Wrong Email/Password try again!"}).end();
        else
            res.status(500).send({authentication :false, message:"Server Internal Problem!"}).end();
    }
}


/*Get an X-Auth-Token*/
module.exports.getXAuth = async () => {
    try{
        let response = await axios.post(`${keyrockEndpoint}/v1/auth/tokens`, {"name": process.env.KEYROCK_ADMIN_NAME,"password": process.env.KEYROCK_ADMIN_PASS},{headers:{'Content-Type':'application/json'}});
        return response.headers['x-subject-token'];
    }catch(e){
        return null;
    }
}

/*Find your App ID from name */
module.exports.getAppID = async() => {
    try{
        let xauth = await this.getXAuth();
        let response = await axios.get(`${keyrockEndpoint}/v1/applications`,{headers:{"X-Auth-token": xauth}});
        let app = response.data.applications.filter(a => a.name === process.env.KEYROCK_APP_NAME);
        return app[0].id;
    }catch(e){
        return null;
    }
}

/*Find role ID by name */
module.exports.getRoleID = async(_name) => {
    try{
        let xauth = await this.getXAuth();
        let appid = await this.getAppID();
        let response = await axios.get(`${keyrockEndpoint}/v1/applications/${appid}/roles`,{headers:{"X-Auth-token": xauth}});
        let role = response.data.roles.filter(a => a.name === _name);
        return role[0].id;
    }catch(e){
        return null;
    }
}

/*Find role name by role ID*/
module.exports.getRoleName = async(_id) => {
    try{
        let xauth = await this.getXAuth();
        let appid = await this.getAppID();
        let response = await axios.get(`${keyrockEndpoint}/v1/applications/${appid}/roles`,{headers:{"X-Auth-token": xauth}});
        let role = response.data.roles.filter(a => a.id === _id);
        return role[0].name;
    }catch(e){
        return null;
    }
}
/* Get id, username, email of User */
module.exports.getUser = async(_xsubtoken) => {
    try{
        let xauth = await this.getXAuth();
        let response = await axios.get(`${keyrockEndpoint}/v1/auth/tokens`,{headers:{"X-Auth-token": xauth, "X-Subject-token": _xsubtoken}});
        return {"id":response.data.User.id, "username": response.data.User.username, "email": response.data.User.email};
    }catch(e){
        return null;
    }
}
/* Get username from User ID */
module.exports.getUsernameByID = async(_id) => {
    try{
        let xauth = await this.getXAuth();
        let response = await axios.get(`${keyrockEndpoint}/v1/users`,{headers:{"X-Auth-token": xauth}});
        let user = response.data.users.filter(a => a.id === _id)
        return user[0].username;
    }catch(e){
        return null;
    }
}

/* Get user role */
module.exports.getUserRole = async(_xsubtoken) => {
    try{
        let xauth = await this.getXAuth();
        let user = await this.getUser(_xsubtoken);
        let appid = await this.getAppID();
        let response = await axios.get(`${keyrockEndpoint}/v1/applications/${appid}/users`,{headers:{"X-Auth-token": xauth}});
        let user_roles = response.data.role_user_assignments.filter(a => a.user_id === user.id);
        let user_role_id = user_roles[0].role_id;
        let user_role_name = await this.getRoleName(user_role_id);
        return {
            "role_id" : user_role_id,
            "role_name": user_role_name
        }
    }catch(e){
        return null;
    }
}
/* User registration */
module.exports.registerUser = async(data) => {
    try{
        let xauth = await this.getXAuth();
        console.log(xauth);
        axios.post(`${keyrockEndpoint}/v1/users`,{"user":{"username":data.uname_input,"email":data.email_input,"password":data.pass_input} },{headers:{"X-Auth-token": xauth,"Content-Type": "application/json"}});
        return true;
    }catch(e){
        console.log(e.data.error.message)
        return false;
    }
}

