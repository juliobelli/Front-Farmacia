import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useContext } from 'react'

function Navbar() {
  let navigate = useNavigate()

  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    alert('Usuário deslogado com sucesso')
    navigate('/login')
  }

  let navbarComponent

  if (usuario.token !== "") {
    navbarComponent = (
      <>
        <div className="flex w-full bg-white border-b-lime-500 py-0 border-b-2 justify-start">
        <div className="flex text-center text-2xl uppercase items-center gap-4">
        </div>

        <div className="flex space-x-24 justify-center text-center gap-8 colorText  mx-auto">
          <div className="flex space-x-4 justify-center text-center items-center mx-auto text-xl">
            <Link to='/' className="hover:text-lime-500">Início</Link><span>|</span>
            <Link to='/Categorias'className='hover:text-lime-500'>Categorias</Link><span>|</span>
            <Link to='/cadastrocategoria'className='hover:text-lime-500'>Cadastrar Categoria</Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="colorText gap-4 mr-10 text-xl">
          <Link to='/login' className="hover:text-lime-500">Entrar</Link>
          </div>
        </div>
      </div>
      </>

    )
  }
  return (
    <>
      {navbarComponent}
    </>
  )
}

export default Navbar