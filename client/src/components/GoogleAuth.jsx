import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function GoogleAuth() {

  const handleGoogleSignIn = async () => {
    
  }
  return (
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleSignIn}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
      Sign In with Google
    </Button>
  )
}
