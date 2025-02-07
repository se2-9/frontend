import { editUserProfile } from "@/lib/api/profile";
import { useAuthStore } from "@/store/auth-store";
import { DtoToUser } from "@/utils/mapper/user-mapper";
import { useMutation } from "@tanstack/react-query";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "../ui/form";
import { Input } from "../ui/input";
import { EditUserProfileFormRequest, EditUserProfileFormSchema } from "@/lib/validations/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

export default function ProfileCard() {
  const [showPassword, setShowPassword] = useState(true);
  const currentUser = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<EditUserProfileFormRequest>({
    resolver: zodResolver(EditUserProfileFormSchema),
    defaultValues: {
      password: "",
      name: "",
      tutor_education_level: "",
      tutor_portfolio: "",
      date_of_birth: currentUser?.dateOfBirth.split('T')[0],
      citizen_id: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.reset({
        password: currentUser.password || "",
        name: currentUser.name || "",
        tutor_education_level: currentUser.tutorEducationLevel || "",
        tutor_portfolio: currentUser.tutorPortfolio || "",
        date_of_birth: currentUser.dateOfBirth.split('T')[0] || "",
        citizen_id: currentUser.citizenId || "",
      });
    }
  }, []);

  const mutation = useMutation({
    mutationFn: editUserProfile,
    onSuccess: (data) => {
      if (!data.result) {
        toast.error("Something went wrong");
        return;
      }
      try {
        const newUser = DtoToUser(data.result)
        // newUser.password = form.getValues().password
        setAuth(useAuthStore.getState().accessToken, useAuthStore.getState().expiresAt,newUser);
        toast.success("Updated");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: EditUserProfileFormRequest) {
    console.log(values);
    mutation.mutate({
    role: currentUser?.role || "student",
    email: currentUser?.email || "myemail.gmail.com",
    password: values.password,
    date_of_birth: values.date_of_birth+"T00:00:00+07:00",
    tutor_education_level: values.tutor_education_level,
    tutor_portfolio: values.tutor_portfolio,
    verify_status: true,
    citizen_id: values.citizen_id,
    name: values.name,
    gender: currentUser?.gender || "male"
})
  }
  console.log(form.formState.errors)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-2 w-full mx-auto px-4 text-text">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={currentUser?.name || "Enter your name"} 
                  type="text"
                />
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.name?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    placeholder={currentUser?.password}
                    type={showPassword ? "text" : "password"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="bg-background text-text h-fit absolute right-2 top-1/2 -translate-y-1/2 p-1"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </Button>
                </div>
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.password?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />
        {currentUser?.role == "tutor" &&<FormField
          name="tutor_education_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Level</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={currentUser?.tutorEducationLevel || "Enter education level"}
                  type="text"
                />
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.tutor_education_level?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />}
        
        {currentUser?.role == "tutor" && <FormField
          name="tutor_portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={currentUser?.tutorPortfolio || "Enter portfolio details"}
                  type="text"
                />
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.tutor_portfolio?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />}
        

        <FormField
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value ? field.value:""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.date_of_birth?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />
        <FormField
          name="citizen_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Citizen ID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={currentUser?.citizenId || "Enter your citizen ID"}
                  type="text"
                />
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.citizen_id?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />

        <Button className="w-full text-text bg-lightbrown" type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
