import logo from '../../assets/logo-borabora.png'
import './TopBar.css'

export default function TopBar() {
  return (
    <header className="topbar">
      <img className="logo-img" src={logo} alt="BoraBora" />
      <div className="openpill">
        <span className="dot"></span>Abierto
      </div>
    </header>
  )
}
