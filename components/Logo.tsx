import Image from "next/image"
import logo from "../public/logo-dark.svg"
import logoMobile from "../public/logo-mobile.svg"

type Props = {
  mobile?: boolean
}

const Logo = ({mobile}: Props) => {
  return (
    <Image src={mobile ? logoMobile : logo}/>
  )
}

export default Logo
