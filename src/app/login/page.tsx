import LoginForm from '@/components/login-form';
import MaxWidthWrapper from '@/components/max-width-wrapper';

export default function Login() {
  return (
    <MaxWidthWrapper className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold text-center mb-10">
        อย่าหาว่าพี่สอน
      </h1>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </MaxWidthWrapper>
  );
}
