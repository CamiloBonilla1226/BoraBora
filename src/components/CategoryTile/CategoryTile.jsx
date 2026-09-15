import { IconGranizados, IconMicheladas, IconPeceras, IconLicor } from '../Icons'
import './CategoryTile.css'

const CATEGORY_ICONS = {
  granizados: IconGranizados,
  micheladas: IconMicheladas,
  peceras: IconPeceras,
  licor: IconLicor,
}

export default function CategoryTile({ category, onOpen }) {
  const Icon = CATEGORY_ICONS[category.key]
  return (
    <button className="cat-tile" onClick={() => onOpen(category.key)}>
      <Icon />
      <span>
        <b>{category.label}</b>
        <span>{category.countLabel}</span>
      </span>
    </button>
  )
}
