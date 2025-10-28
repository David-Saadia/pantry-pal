import LoginPage from "@/app/(frontend)/(pages)/login/page";
import AuthLayout from "@/app/(frontend)/(auth)/authLayout";

export default function Home() {
    return (
            <AuthLayout>
                <LoginPage/>
            </AuthLayout>
    );
}
