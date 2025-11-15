import SideNavBar from "@/components/SideNavBar";
import {useUser} from "@/contexts/UserContext";

const PageWrapper = ({children,currentPage}) => {
    const { user, loading } = useUser();
    if (loading) {
        return null;
    }

    if (!user) {
        return null;
    }

  return (
      <div className="relative flex min-h-screen w-full">
          <SideNavBar userName={user.user_metadata.full_name} currentPage={currentPage}/>
          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
              <div className="max-w-4xl mx-auto">
                  {children}
              </div>
          </main>
      </div>
  )
}

export default PageWrapper