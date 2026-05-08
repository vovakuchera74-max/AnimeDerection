import { useForm } from 'react-hook-form';
import s from "../styles/Signup.module.scss"
import { Link } from 'react-router-dom';

interface Singin{
    username:string;
    userpassword:string;
}
export const Sign_in = ()=>{
// const {register,handleSubmit}=useForm<Singin>()

    return(
        <div className={s.auth_container}>
        <div className={s.Sign_up_BOX}>
            <form action="" className={s.Form}>
                <div className={s.Inputt}><input type="text" placeholder='Username'/></div>
                <div className={s.Inputt}><input type="Password" placeholder='Password'/></div>
                <div className={s.Buttonn}><button type='submit'>Sing in</button></div>
            </form>
            <div className={s.Sign_in_Text}><Link to='/signup'>Don't have acount? Sign up here</Link></div>
        </div>
</div>
    )}