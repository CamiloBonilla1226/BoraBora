import { IconLocation, IconWhatsapp, IconInstagram, IconClock } from '../Icons'
import { SCHEDULE_TEXT } from '../../utils/schedule'
import { WHATSAPP_NUMBER, buildWhatsAppContactLink } from '../../utils/whatsapp'
import './StoreInfo.css'

const INSTAGRAM_HANDLE = 'BoraBoraGranizados'

export default function StoreInfo() {
  return (
    <div className="store-info">
      <div className="store-row">
        <IconLocation />
        <span>Cra20 #7a-17, Barrio La Esmeralda</span>
      </div>

      <a className="store-row store-link" href={buildWhatsAppContactLink()} target="_blank" rel="noopener noreferrer">
        <IconWhatsapp />
        <span>WhatsApp · {WHATSAPP_NUMBER}</span>
      </a>

      <a
        className="store-row store-link"
        href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconInstagram />
        <span>@{INSTAGRAM_HANDLE}</span>
      </a>

      <div className="store-row store-schedule">
        <IconClock />
        <div>
          {SCHEDULE_TEXT.map((s) => (
            <p key={s.days}>
              <strong>{s.days}</strong> · {s.hours}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
