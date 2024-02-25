import { useState} from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from './logo.0cfaa4df.png';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

  const navigate = useNavigate('');
  const [isPending, setIsPending] = useState(false);
  const  [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const generateError = (err) => toast.error(err, {
    position: "bottom-right"
 })

 const saveDataToLocalStorage = (data) => {
  localStorage.setItem('userData', JSON.stringify(data));
};
  const handleSubmit = async (e) =>{
     e.preventDefault()
     try{
     const { data } =  await axios.post("http://localhost:1338/login", {
       email, password
     },{
      withCredentials: true
     });
     console.log(data);
     setIsPending(true);
     if(data) {
      if(data.errors){
        setIsPending(false);
        const {email, password} = data.errors;
        if(email) generateError(email);
        else if(password) generateError(password);
      }else{
        saveDataToLocalStorage(data);
         navigate("/first");
         swal("Login Successfull")
         setIsPending(false);
      }
     }
     }catch(err){
      swal("Check Password or Email")
      setIsPending(false);
     }
    }
  return (
    
      <div>
      
        <div className="text-sm shadow-lg p-1 rounded-md sm:w-4/12 w-full mt-16 m-auto  items-center flex flex-col">
        <img src={logo} alt="smrt-sign" className="w-20 h-20 mt-4" />
        <h1 className="text-3xl font-bold mt-6">Login</h1>
          <form onSubmit={handleSubmit} className="mt-8 sm:w-10/12 w-full flex flex-col">
          <div className='flex w-full text-md flex-col'>
             <label className='text-xl '>Email</label>
                <input type="email" className='border-b indent-4 m-2 focus:outline-blue-400  h-[5vh]' placeholder='    Enter your email....' required value={email} onChange={(e) => setEmail(e.target.value)} />
                
          </div>

            <div className='flex w-full text-md flex-col'>
            <label className='text-xl'>Password</label>

              <input type="password" className='border-b indent-4 m-2 focus:outline-blue-400 h-[5vh]' placeholder='    Your Password.... ' required  value={password} onChange={(e) => setPassword(e.target.value)}/>   
              <p className='text-blue-500 text-xl text-left hover:text-blue-900 cursor-pointer ml-6'><Link to="/forgotpwd">Forgot Password</Link></p>    
            </div>
          
            <div>
              <div className='flex justify-center mb-6'>
                 { !isPending && <button type='submit'  className="bg-blue-700 text-white text-xl rounded-md h-14 w-40 m-auto mt-4">LOGIN</button> }
                   { isPending && <button disabled>LOADING ......</button> }
              </div>
                
            
              
                <p className='text-blue-500 text-center text-xl'><Link to="/signup"><span className='hover:text-blue-900'>Create An Account</span></Link></p>
              
            </div>
            <br />
          </form>
          <ToastContainer />
        </div>
      </div>
   
  );
};

export default Login;

