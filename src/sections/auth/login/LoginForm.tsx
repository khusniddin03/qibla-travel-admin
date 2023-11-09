import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import useResponsive from "@/hooks/useResponsive";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "@/context/appContext";
import { useMutation } from "react-query";
import { registrationPost } from "./loginForm.api";
import { onStorage } from "@/utils/onStorage";
import CheckboxField from "@/components/fields/CheckboxField";
import { USER_DATA_KEY } from "@/consts";
import CustomTextField from "@/components/fields/CustomTextField";

const PasswordField = lazy(() => import("@/components/fields/PasswordField"));
const CustomButton = lazy(() => import("@/components/customButton"));

export default function LoginForm() {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const isDesktop = useResponsive("sm", "xs");
  const [remember, setRemember] = useState<boolean>(true);

  const propsCheckbox = {
    name: "remember",
    label: "Remember me",
    onChange: (value: boolean) => setRemember(value),
    value: remember,
  };

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .required("Parol kiriting!")
      .test("len", "Parol 8 ta belgidan kam bo'lmasligi kerak!", (value) => {
        if (value) {
          return value.trim().length >= 8;
        }
        return false;
      })
      .min(8, "Prol 8 ta belgidan kam bo'lmasligi kerak!"),
    email: Yup.string()
      .test("len", "Emailni to'g'ri kiriting!", (value) => {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        return emailRegExp.test(value ?? '');
      })
      .required("Email kiriting!"),
  });

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { isLoading, error, mutateAsync } = useMutation(registrationPost);

  const loginHandler = async () => {
    const data = getValues();

    const registrationResponse = await mutateAsync(data);
    if (registrationResponse) {
      if (remember) {
        onStorage(USER_DATA_KEY, registrationResponse.data);
      }
      setUser(registrationResponse.data);
      navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    const errorData = {
      password: {
        message: "Пожалуйста, проверьте свой пароль и повторите попытку.",
        type: "required",
      },
      phone_number: {
        message: "Пожалуйста, проверьте номер телефона и повторите попытку.",
        type: "optionality",
      },
    };
    if (error) {
      Object.entries(errorData).forEach(([key, value]: any) => {
        setError(key, value);
      });
    }

    // eslint-disable-next-line
  }, [error]);

  return (
    <form onSubmit={handleSubmit(loginHandler)}>
      <Suspense fallback=''>
        <Stack
          border="1px solid #E2E8F0"
          borderRadius="22px"
          px={isDesktop ? "15px" : "40px"}
          py={isDesktop ? "15px" : "36px"}
          bgcolor="#FEFEFE"
        >
          <Stack spacing={3}>
            <CustomTextField
              register={register}
              errors={errors}
              label="Email"
              name="email"
              disabled={isLoading}
            />

            <PasswordField
              errors={errors}
              name="password"
              register={register}
              label="Parol"
              disabled={isLoading}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: "14px" }}
            flexWrap="wrap"
          >
            <Stack direction="row" alignItems="center">

              <CheckboxField
                {...propsCheckbox}
                checked={true}
                id="remember"
              />
              <label htmlFor="remember">
                <Typography
                  variant="body2"
                  sx={{ color: "#1E293B", fontWeight: "500", userSelect: "none" }}
                >
                  Eslab qolish
                </Typography>
              </label>
            </Stack>
          </Stack>

          <CustomButton
            variant="contained"
            isLoading={isLoading}
          >
            Kirish
          </CustomButton>
        </Stack>
      </Suspense>
    </form>
  );
}