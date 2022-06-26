import { auth } from "../firebase"

async function LogInWithGoogle() {
  const provider = new auth.GoogleAuthProvider()
  const authProps = auth.getAuth()

  auth.signInWithPopup(authProps, provider).then((res) => {
    const user = res.user
    console.log(user.displayName)
    return user
  })
}

export { LogInWithGoogle }
