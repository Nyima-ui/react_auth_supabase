import { useState, useEffect } from "react";
import { supabaseClient } from "../supabaseClient.js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
  };

  const signUp = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  };

  if (!session) {
    return (
      <>
        {/* <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} /> */}
        <button onClick={signUp}>Sign up with google</button>
      </>
    );
  } else {
    return (
      <>
        <div>Welcome, {session?.user?.user_metadata?.name}</div>
        <button onClick={signOut}>Sign Out</button>
      </>
    );
  }
}

export default App;
