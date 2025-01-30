// "use client";
// import { useState, useEffect } from "react";
// import { auth, googleLogin, logout } from "../firebase.js";

// export default function Login() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div>
//       {user ? (
//         <>
//           <p>Welcome, {user.displayName}</p>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <button onClick={googleLogin}>Login with Google</button>
//       )}
//     </div>
//   );
// }
