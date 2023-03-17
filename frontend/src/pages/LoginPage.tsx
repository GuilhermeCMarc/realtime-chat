import { ArrowRightIcon } from "@radix-ui/react-icons";

import Center from "../components/presentation/Center";
import Button from "../components/form/Button";
import Card from "../components/presentation/Card";
import CardRow from "../components/presentation/CardRow";
import FormInput from "../components/form/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "../schemas/userSchemas";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  const { isLoading, login, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  async function onSubmit(data: any) {
    const result = userLoginSchema.safeParse(data);

    if (!result.success) {
      console.error("invalid data");
      return;
    }

    await login(result.data);

    navigate("/");
  }

  return (
    <Center>
      <Card className="w-full">
        <CardRow>
          <h1 className="font-bold">Login</h1>
          <p className="text-slate11 text-sm">
            Login to start chatting with your friends
          </p>
        </CardRow>
        <CardRow>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              label="Email"
              placeholder="Type here your email"
              type="email"
              required
              error={errors.email}
              {...register("email")}
            />
            <FormInput
              label="Password"
              placeholder="Type your password"
              type="password"
              required
              isPassword
              error={errors.password}
              {...register("password")}
            />
            <Button disabled={!isValid} fullWidth>
              Login
              <ArrowRightIcon />
            </Button>
            <Button type="button" intent="secondary" fullWidth asChild>
              <Link to={"/register"}>Create an account</Link>
            </Button>
          </form>
        </CardRow>
      </Card>
    </Center>
  );
}
