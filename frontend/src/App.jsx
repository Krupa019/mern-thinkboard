import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from "@clerk/clerk-react";

import Homepage from "./pages/Homepage";
import Notecreated from "./pages/CreatePage";
import NoteDetail from "./pages/NoteDetail";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <Toaster />
      <div className="absolute inset-0 -z-10 h-full items-center px-5 py-24
      [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Routes>
        {/* Clerk built-in Auth pages */}
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

        {/* Protected routes (only visible after login) */}
        <Route
          path="/"
          element={
            <SignedIn>
              <Homepage />
            </SignedIn>
          }
        />
        <Route
          path="/create"
          element={
            <SignedIn>
              <Notecreated />
            </SignedIn>
          }
        />
        <Route
          path="/note/:id"
          element={
            <SignedIn>
              <NoteDetail />
            </SignedIn>
          }
        />

        {/* Redirect users who aren’t signed in */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
