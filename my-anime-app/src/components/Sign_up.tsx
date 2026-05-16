import s from '../styles/Signup.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
// 1. Створюємо схему Zod (описуємо наші ідеальні дані)
const signUpSchema = z
  .object({
    email: z.string().min(1, 'Mail is required').email('Invalid mail format'),
    username: z.string().min(3, 'Username must have 3 symbols'),
    password: z.string().min(6, 'Password must have 6 symbols'),
    confirmPassword: z.string().min(1, 'repeat the password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // Ця функція перевіряє, чи збігаються паролі
    message: "Passwords don't match",
    path: ['confirmPassword'], // Вказуємо, що цю помилку треба показати під полем confirmPassword
  });

// 2. МАГІЯ ZOD: автоматично генеруємо тип з нашої схеми!
// Нам більше не треба вручну писати interface SignUpForm {...}
type SignUpForm = z.infer<typeof signUpSchema>;

export const Sign_up = () => {
  const navigate = useNavigate();
  // 3. Підключаємо схему до useForm через zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await authApi.signUp(data.email, data.password, data.username);
      alert("Go to your email to confirm your account.")
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.auth_container}>
      <div className={s.Sign_up_BOX}>
        <form className={s.Form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.Inputt}>
            <input {...register('email')} type="email" placeholder="Email" />
            {errors.email && (
              <span
                style={{
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginLeft: '6px',
                }}
              >
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={s.Inputt}>
            <input
              {...register('username')}
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <span
                style={{
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginLeft: '6px',
                }}
              >
                {errors.username.message}
              </span>
            )}
          </div>

          <div className={s.Inputt}>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <span
                style={{
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginLeft: '6px',
                }}
              >
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Нове поле: Повторити пароль */}
          <div className={s.Inputt}>
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <span
                style={{
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginLeft: '6px',
                }}
              >
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className={s.Buttonn}>
            <button type="submit">Sign up</button>
          </div>
        </form>

        <div className={s.Sign_in_Text}>
          <Link to="/signin">Registered? Sign in here</Link>
        </div>
      </div>
    </div>
  );
};
