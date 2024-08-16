import { useContext, useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import Categoria from '../../../Models/Categoria';
import { buscar } from '../../../Service/Service';
import CardCategoria from '../CardCategoria/CardCategoria';

function ListaCategoria() {
    const [temas, setTemas] = useState<Categoria[]>([]);
  
    let navigate = useNavigate();
  
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token; // Use optional chaining para evitar erros
  
    async function buscarTemas() {
      if (!token) return; // Se token for undefined ou vazio, não prosseguir
    
      try {
        await buscar('/temas', setTemas, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        }
      }
    }
  
    useEffect(() => {
      if (!token || token === '') { // Verifique se token é undefined ou vazio
        navigate('/login');
      }
    }, [token, navigate]);
  
    useEffect(() => {
      buscarTemas();
    }, [temas.length]);
  
    return (
      <>
        {temas.length === 0 && (
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
          />
        )}
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {temas.map((tema) => (
                <CardCategoria key={tema.id} categoria={tema} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default ListaCategoria;
