import { ArrowRightIcon } from "@radix-ui/react-icons";

import Center from "../components/Center";
import Button from "../components/Button";
import Card from "../components/Card";
import CardRow from "../components/CardRow";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "../schemas/userSchemas";
import { login } from "../api/authentication";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  async function onSubmit(data: any) {
    const result = userLoginSchema.safeParse(data);

    if (!result.success) {
      console.error("invalid data");
      return;
    }

    const response = await login(result.data);
    console.log({ response });
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
