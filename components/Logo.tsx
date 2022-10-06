import Image from "next/image"
import logo from "../public/logo-light.svg"
import logoMobile from "../public/logo-mobile.svg"

type Props = {
  mobile?: boolean
}

const Logo = ({mobile}: Props) => {
  return (
    <Image src={mobile ? logoMobile : logo} alt="Kanban"/>
  )
}

export default Logo
