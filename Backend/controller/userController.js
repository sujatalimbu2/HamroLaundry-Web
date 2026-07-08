const {createUser,existingUser, getAllUser , getUserById, deleteById, updateUser, searchUser,

} = require("../model/userModel")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const addUser = async (req, res)=>{
    try {
        console.log(req.body) // debugging
        const {name, email, password, address, contact}= req.body;
        const image = req.file ? req.file.filename : null; // 
        if(!name || !email || !password || !address || !contact) {
           return res.status(400).json({  // return to exit loop
                message: "Field empty",
            });      
         }

          // Check if email already exists
        const userExists = await existingUser(email);

        if (userExists) {
            return res.status(400).json({
                message: "Email already registered",
            });
        }

    
        const hashpassword = await bcrypt.hash(password, 10);
         const user = await createUser(name, email, hashpassword, address, contact, image);

         if(user){
            res.status(201).json ({
                message :"Created successful",
                user: user,
            });
         }

    }  catch(e) {
        console.error(e);
            res.status(500).json({
                message: "Registration Unsccessful",
                e: e.message,
            });
        }
};

const getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let user;
    if (search) {
      user = await searchUser(search);
    } else {
      user = await getAllUser();
    }
    res.json({
      message: "successful",
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "unsuccessfull fetch",
      e: e.message,
    });
  }
};

const login = async (req, res) => {
    
    try{
        console.log(req.body)
        const {email, password: inputPassword} = req.body;
        if(!email || !inputPassword) {
            return res.status(400).json({
                message: "Field empty"
            });
        }
        const user = await existingUser(email);
        if(!user){
            return res.status(400).json({ 
                message :"email is not register"
            });
        }

        const isMatched = await bcrypt.compare(inputPassword,user.password);
        if(!isMatched){
            return res.json({
             message:"password doesnt matched",
           });
        }

        const token = JWT.sign(
           {
                id: user.id,
                email: user.email,
                role: user.role,
           },
           process.env.JWT_SECRET,
           {
                 expiresIn:"1d"
           },
        );

          res.json({
                  message: "Login successful",
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    address: user.address,
                    image: user.image
                    }
                 });
       // conform token
    } catch(e) {
        res.status(500).json({
          message: "not succesful",
          e: e.message,
      });
    } 
};
const getAllUserFromTheDB = async (req, res) => {
    try{
        const user = await getAllUser();
        if(!user || user.length == 0){
           return res.status(400).json({
                message:"user is not present",
            });
        }
        res.status(200).json({
            message:"successful",
            user:user,
        });
    }catch (e){
        res.status(500).json({
            message:"unsuccessful",
            e: e.message,
        });
    }
};

// function getuserbyid
const getUserByIDDB = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await getUserById(id);
        if(!user){
           return res.status(404).json({
                message:"not found",
            });
        }
        res.status(200).json({
            message:"successfully fetched",
            user:user,
        });
    }catch (e){
        res.status(500).json({
            message:"unsuccessful",
            e: e.message,
        });
    }
};

const deleteUserByIDDB = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await deleteById(id);
        if(!user){
           return res.status(404).json({
                message:"user not found",
            });
        }
        res.json({
            message:"user deleted successfully",
            user:user,
        });
    }catch (e){
        res.status(500).json({
            message:"server error",
            e: e.message,
        });
    }
};


const updateUserIDBD = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, address, contact } = req.body;
        const image = req.file ? req.file.filename : null;

        let hashedPassword = null;
         if (password && password.trim() !== "") {
            hashedPassword = await bcrypt.hash(password, 10);
        }


        const user = await updateUser(id, name, email, hashedPassword, address, contact, image);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json({
            message: "User updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports ={ addUser, login, getAllUserFromTheDB, getUserByIDDB,deleteUserByIDDB, updateUserIDBD, getUsers,};