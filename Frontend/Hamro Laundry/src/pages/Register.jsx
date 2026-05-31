import {useState} from "react";
import { createUser } from "../service/Api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage]= useState(null);
    const navigate = useNavigate();

      const register = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    if (name.length < 3) {
      return toast.error("Name must be at least 3 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Enter a valid email");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      const response = await createUser(formData);
      toast.success(response.data.message);
      navigate("/login");
    } catch (e) {
      toast.error(e.response?.data?.message || "error");
    }
       
      };

      return (
        <div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type= "file" onChange={(e)=> setImage(e.target.files[0])} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        </div>
      );
 };
 export default Register;