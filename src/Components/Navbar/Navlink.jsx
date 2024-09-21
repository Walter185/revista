import { NavLink as Link, useLocation } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

export default function Navlink({ to, name, ...rest }) {
  const location = useLocation()

  const isActive = location.pathname === to

  return (
    <Link to={to}>
      <Button
        variant={isActive ? 'outline' : 'black'}
        colorScheme={isActive ? 'black' : ''}
        {...rest}
      >
        {name}
      </Button>
    </Link>
  )
}
