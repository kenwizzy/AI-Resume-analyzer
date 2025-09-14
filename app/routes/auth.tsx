import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";;
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    {title:'Resumind | Auth'},
    {name:'description', content:'Log into your account'},
])

const Auth = () => {
    const {isLoading,auth} = usePuterStore(); 
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {//if a use tries to access an unauthorize page, it redirects them to auth page. but the they logs in it redirects them back to the page
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center">
           <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                     <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In To Continue Your Job Journey</h2>
                     </div>

                     <div>
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
 