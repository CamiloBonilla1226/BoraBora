import logo from '../assets/logo-borabora.png'

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
