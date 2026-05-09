import { useForm } from 'react-hook-form';
import s from "../styles/Signup.module.scss"
import { Link } from 'react-router-dom';
import {z} from "zod"
import { authApi } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod';
const signInSchema = z.object({
    email:z.string().min(1, "Mail is required").email("Invalid mail format"),
    password:z.string().min(6,"Password must have 1 symbols")
})
type SignInForm = z.infer<typeof signInSchema>;
export const Sign_in = ()=>{
    const navigate = useNavigate()
const {register,handleSubmit,reset,  formState: { errors }}=useForm<SignInForm>({
  resolver: zodResolver(signInSchema) 
})
const onSubmit = async (data: SignInForm) => {
    try {
      await authApi.signIn(data.email, data.password)
      navigate('/')
    } catch (error) {
      alert("Incorrect email or password. Please try again.")
      reset()
    }
  }
    return(
        <div className={s.auth_container}>
        <div className={s.Sign_up_BOX}>
            <form action="" className={s.Form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.Inputt}><input {...register("email")} type="email" placeholder='Email'/></div>
                {errors.email && <span style={{color: '#ff6b6b', fontSize: '14px', fontWeight: "500",marginLeft: "6px"}}>{errors.email.message}</span>}
                <div className={s.Inputt}><input {...register("password")} type="Password" placeholder='Password'/></div>
                 {errors.password && <span style={{color: '#ff6b6b', fontSize: '14px', fontWeight: "500",marginLeft: "6px"}}>{errors.password.message}</span>}
                <div className={s.Buttonn}><button type='submit'>Sing in</button></div>
            </form>
            <div className={s.Sign_in_Text}><Link to='/signup'>Don't have acount? Sign up here</Link></div>
        </div>
</div>
    )}