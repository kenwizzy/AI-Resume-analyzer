import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect,useState } from "react";
import {Link, useNavigate } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeAnalyzer" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {

  const {auth} = usePuterStore(); 
  const navigate = useNavigate();

  useEffect(() => {//if a use tries to access an unauthorize page, it redirects them to auth page. but the they logs in it redirects them back to the page
      if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
     <section className="main-secton">
            <div className="page-heading py-16">
                <h1>Track Your Applications & Resume Ratings</h1>
                <h2>Rewiew your submissions and check AI-powered feedback</h2>
            </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
        </div>
      )}
  
  </section>

  </main>
}
