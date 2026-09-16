import logo from '../../assets/logo-borabora.png'
import { useNow } from '../../utils/useNow'
import { isOpenNow } from '../../utils/schedule'
import './TopBar.css'

export default function TopBar() {
  const now = useNow()
  const open = isOpenNow(now)

  return (
    <header className="topbar">
      <img className="logo-img" src={logo} alt="BoraBora" />
      <div className={open ? 'openpill' : 'openpill openpill-closed'}>
        <span className="dot"></span>
        {open ? 'Abierto' : 'Cerrado'}
      </div>
    </header>
  )
}
