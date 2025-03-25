const logOutController = {}; 

logOutController.logOut = async (req, res) => { 

    res.clearCookie("authToken"); 
     return res.json({message: "LogOut Successful"});

};

export default logOutController;