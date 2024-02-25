import logo from './logo.0cfaa4df.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {

   const navigate = useNavigate('');
 const [isPending, setIsPending] = useState(false);
 const [name, setName] = useState();
 const  [email, setEmail] = useState();
 const [password, setPassword] = useState();
 const [role, setRole] = useState();
 const generateError = (err) => toast.error(err, {
    position: "bottom-right"
 })
 console.log('role here:', role);
 const handleSubmit = async(e) =>{
    e.preventDefault()
    setIsPending(true);
   try{
   const { data } =  await axios.post("http://localhost:1338/request", {
    name, email, password, role
   },{
    withCredentials: true
   });
   console.log(role)
   swal("user created")
   console.log(data);
   setIsPending(false);
   if(data) {
    if(data.errors){
      const {email, password} = data.errors;
      if(email) generateError(email);
      else if(password) generateError(password);
    }else{
       navigate("/login");
    }
   }
   }catch(err){
    swal("user not created")
    setIsPending(false);
   }
}
        
    return (  
      <div>
        <div className="text-sm  shadow-lg p-1 rounded-md sm:w-4/12 w-full md:mt-10 mt-0  m-auto flex flex-col">
            <div>
                 <div>
                  <div className='flex flex-col items-center'>
                               <img src={logo} alt="" className="w-20 h-20 mt-4" />
        <h1 className="text-3xl font-semi-bold mt-6">SignUp</h1> 
                  </div>
                  </div>
                 <form onSubmit={handleSubmit} className='mt-8 sm:w-10/12 md:w-[90%] w-[78%] ml-8 flex flex-col'>
                 <label className='w-full text-left text-xl'>Full Name</label>
                <input type="text" placeholder='Enter Your Name Here!'  required value={name} onChange={(e) => setName(e.target.value)} className='mt-2 mb-2 m-2 focus:outline-blue-400 h-[5vh] border-b w-full'/>
                <label className='w-full text-left text-xl'>Phone Number</label>
                <input type="text" placeholder='Eg: +2507....'  required className='mt-2 mb-2 m-2 focus:outline-blue-400 h-[5vh] border-b w-full' />
                <label className='w-full text-left text-xl'>Email</label>
                <input type="email" placeholder='Eg: email@gmail.com'   required value={email} onChange={(e) => setEmail(e.target.value)} className='mt-2 mb-2 m-2 focus:outline-blue-400 h-[5vh] border-b w-full' />
                <label className='w-full text-left text-xl'>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className='mt-2 mb-2 m-2 focus:outline-blue-400 h-[5vh] border-b w-full'/>
                <label className='w-full text-left text-xl'>Role</label>
                <select className='mt-2 mb-2 m-2 focus:outline-blue-400 h-[5vh] border-b w-full' required value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value=""></option>
                  <option value="patron">Patron</option>
                  <option value="matron">Matron</option>
                  <option value="teacher1`">Teacher</option>
                  <option value="Discipline Prefect">Discipline Prefect</option>
                </select>
                <div>
                  <div className='flex justify-center mb-6'>
                     { !isPending && <button type='submit' className="bg-blue-700 text-white text-xl rounded-md h-14 w-40 m-auto mt-4">SIGN UP</button> }
                   { isPending && <button disabled>LOADING ......</button> }
                  </div>
                
                       <p className='text-blue-400 text-center text-xl'> Have An Account? {"  "}
                        <Link to="/login" className='text-blue-500 text-center text-xl hover:text-blue-900'>Sign In</Link>
                    
                       </p>
                        
                </div>
                <br />
            </form>
            <ToastContainer />
        </div>
       
        </div>
        </div>
    );
}
 
export default Signup;