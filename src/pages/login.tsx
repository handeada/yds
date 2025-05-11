import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/authSchemas";
import { useSelector } from "react-redux";
import { selectAuth, login } from "@/store/auth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { FiLogIn } from "react-icons/fi";

function Login() {
  const dispatch = useAppDispatch();
  const { error } = useSelector(selectAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      setError("root", {
        type: "manual",
        message: error,
      });
    }
  }, [error, setError]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(login({ username: data.username, password: data.password }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-md shadow-md mx-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Giriş Yap
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="username" className="form-label">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              className={`form-input ${
                errors.username ? "border-error focus:ring-error" : ""
              }`}
              {...register("username")}
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="form-error mt-1">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              className={`form-input ${
                errors.password ? "border-error focus:ring-error" : ""
              }`}
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="form-error mt-1">{errors.password.message}</p>
            )}
          </div>

          {errors.root?.message && (
            <div className="form-error p-3 bg-red-50 rounded-md">
              {errors.root?.message}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded py-2 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <FiLogIn className="h-4 w-4 mr-2" />
            {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
Login.requireAuth = false;

export default Login;
