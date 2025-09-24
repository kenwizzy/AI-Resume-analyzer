import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";;
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    {title:'ResumeIQ | Auth'},
    {name:'description', content:'Log into your account'},
])

const Auth = () => {
    const {isLoading,auth} = usePuterStore(); 
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {//if a user tries to access an unauthorize page, it redirects them to auth page. but when they logs in it redirects them back to the page
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    {/* </main><main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center"> */}
           <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                     <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In To Analyze Your Resume And Take The Next Step In Your Career</h2>
                     </div>

                     <div className="text-center">
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in ...</p>
                            </button>
                        ) : (
                          <>
                            {auth.isAuthenticated ? (
                                <button className="auth-button" onClick={auth.signOut}>
                                   <p>Log Out</p>
                                </button>
                            ) : (
                                <button className="auth-button" onClick={auth.signIn}>
                                   <p>Log In</p>
                                </button>
                            )}
                          </>
                        )}
                     </div>
                </section>
           </div>
    </main>
  )
}

export default Auth
 